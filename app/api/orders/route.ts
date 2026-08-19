import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

/* ─────────────────────────────────────────────
 * Orders API — The "Handshake" Checkout
 *
 * GET  — List orders for current user (farmer or consumer)
 * POST — Create new order (consumer) + reserve inventory
 * PATCH — Update order status (accept, fulfill, cancel)
 * ───────────────────────────────────────────── */

export async function GET(request: NextRequest) {
  const supabase = await createServerClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const role = searchParams.get('role') || 'consumer'
  const status = searchParams.get('status')

  let query = supabase
    .from('orders')
    .select(`
      *,
      produce_listings ( produce_name, category, photo_url, price_per_kg ),
      consumer:consumer_id ( first_name, last_name ),
      farmer:farmer_id ( first_name, last_name )
    `)
    .order('placed_at', { ascending: false })

  if (role === 'farmer') {
    query = query.eq('farmer_id', user.id)
  } else {
    query = query.eq('consumer_id', user.id)
  }

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

export async function POST(request: NextRequest) {
  const supabase = await createServerClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { listing_id, quantity_kg, fulfilment_method = 'pickup' } = body

  /* Fetch the listing to verify availability */
  const { data: listing, error: listingError } = await supabase
    .from('produce_listings')
    .select('*, farms!inner(owner_id)')
    .eq('id', listing_id)
    .single()

  if (listingError || !listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
  }

  if (listing.status !== 'active') {
    return NextResponse.json({ error: 'Listing is no longer active' }, { status: 400 })
  }

  if (quantity_kg > listing.quantity_kg) {
    return NextResponse.json({ error: 'Insufficient quantity' }, { status: 400 })
  }

  /* Create the order */
  const total_amount = quantity_kg * listing.price_per_kg

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      listing_id,
      consumer_id: user.id,
      farmer_id: listing.farms.owner_id,
      quantity_kg,
      unit_price: listing.price_per_kg,
      total_amount,
      fulfilment_method,
      status: 'pending',
    })
    .select()
    .single()

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 500 })
  }

  /* Reserve inventory — reduce available quantity */
  const newQuantity = listing.quantity_kg - quantity_kg
  await supabase
    .from('produce_listings')
    .update({
      quantity_kg: newQuantity,
      status: newQuantity <= 0 ? 'sold_out' : 'active',
    })
    .eq('id', listing_id)

  return NextResponse.json({ data: order }, { status: 201 })
}

export async function PATCH(request: NextRequest) {
  const supabase = await createServerClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { order_id, action, cancellation_reason } = body

  /* Fetch the order */
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', order_id)
    .single()

  if (orderError || !order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  /* Verify user is party to this order */
  if (order.farmer_id !== user.id && order.consumer_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const updates: Record<string, unknown> = {}

  switch (action) {
    case 'accept':
      if (order.farmer_id !== user.id) return NextResponse.json({ error: 'Only farmer can accept' }, { status: 403 })
      updates.status = 'accepted'
      updates.accepted_at = new Date().toISOString()
      break

    case 'prepare':
      if (order.farmer_id !== user.id) return NextResponse.json({ error: 'Only farmer can mark preparing' }, { status: 403 })
      updates.status = 'preparing'
      break

    case 'fulfill':
      if (order.farmer_id !== user.id) return NextResponse.json({ error: 'Only farmer can fulfill' }, { status: 403 })
      updates.status = 'fulfilled'
      updates.fulfilled_at = new Date().toISOString()
      break

    case 'cancel':
      updates.status = 'cancelled'
      updates.cancelled_at = new Date().toISOString()
      updates.cancellation_reason = cancellation_reason || 'No reason provided'
      updates.cancellation_initiator = order.farmer_id === user.id ? 'farmer' : 'consumer'

      /* Restore inventory on cancellation */
      await supabase.rpc('restore_listing_quantity', {
        p_listing_id: order.listing_id,
        p_quantity: order.quantity_kg,
      })
      break

    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  }

  const { data: updated, error: updateError } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', order_id)
    .select()
    .single()

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  return NextResponse.json({ data: updated })
}
