import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

/* ─────────────────────────────────────────────
 * Auth Callback — Supabase OAuth/Magic Link
 *
 * Handles the redirect from Supabase Auth.
 * Exchanges the code for a session,
 * then redirects to the appropriate dashboard
 * based on the user's role.
 * ───────────────────────────────────────────── */

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createServerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      /* Check if user has a profile — if not, this is first login */
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()

        if (profile) {
          /* Route to the correct dashboard */
          const dashboardPath = profile.role === 'farmer'
            ? '/dashboard/farmer'
            : profile.role === 'admin'
              ? '/dashboard/admin'
              : '/dashboard/buyer'

          return NextResponse.redirect(`${origin}${dashboardPath}`)
        }
      }

      /* Profile not found — redirect to complete signup */
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  /* Auth failed — redirect to login with error */
  return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`)
}
