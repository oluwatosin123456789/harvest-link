import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

/* ─────────────────────────────────────────────
 * Produce API — CRUD for Produce Listings
 *
 * GET  — List produce (with optional geo filtering)
 * POST — Create new listing (farmer only)
 * ───────────────────────────────────────────── */

export async function GET(request: NextRequest) {
  const supabase = await createServerClient()
  const { searchParams } = new URL(request.url)

  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const radiusKm = searchParams.get('radius') || '15'
  const category = searchParams.get('category')
  const status = searchParams.get('status') || 'active'

  let query = supabase
    .from('produce_listings')
    .select(`
      *,
      farms!inner (
        id, farm_name, owner_id, location, lga, state, primary_crops,
        profiles:owner_id ( first_name, last_name, avatar_url )
      )
    `)
    .eq('status', status)
    .order('created_at', { ascending: false })

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  /* If coordinates provided, filter by distance */
  if (lat && lng) {
    // Note: For production, use PostGIS ST_DWithin in a database function.
    // For the hackathon, we do client-side Haversine filtering.
    const filtered = data?.filter(listing => {
      const farmLocation = listing.farms?.location
      if (!farmLocation) return false

      // Supabase GEOGRAPHY Point is stored as { type: 'Point', coordinates: [lng, lat] }
      const farmLng = farmLocation.coordinates?.[0]
      const farmLat = farmLocation.coordinates?.[1]
      if (!farmLng || !farmLat) return false

      const distance = haversineKm(
        parseFloat(lat),
        parseFloat(lng),
        farmLat,
        farmLng
      )

      return distance <= parseFloat(radiusKm)
    }).map(listing => ({
      ...listing,
      distance_km: haversineKm(
        parseFloat(lat!),
        parseFloat(lng!),
        listing.farms?.location?.coordinates?.[1] ?? 0,
        listing.farms?.location?.coordinates?.[0] ?? 0
      )
    })).sort((a, b) => {
      /* FIFO: sort by freshness (most urgent first), then distance */
      const aUrgency = a.estimated_shelf_life_days ?? 999
      const bUrgency = b.estimated_shelf_life_days ?? 999
      if (aUrgency !== bUrgency) return aUrgency - bUrgency
      return (a.distance_km ?? 0) - (b.distance_km ?? 0)
    })

    return NextResponse.json({ data: filtered })
  }

  return NextResponse.json({ data })
}

export async function POST(request: NextRequest) {
  const supabase = await createServerClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  /* Verify user is a farmer */
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'farmer') {
    return NextResponse.json({ error: 'Only farmers can create listings' }, { status: 403 })
  }

  const body = await request.json()

  const { data, error } = await supabase
    .from('produce_listings')
    .insert({
      ...body,
      farmer_id: user.id,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 201 })
}

/* ── Haversine Distance (km) ────────────── */
function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round(R * c * 10) / 10
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180)
}
