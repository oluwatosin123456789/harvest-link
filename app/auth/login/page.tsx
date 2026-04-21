"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

/* ─────────────────────────────────────────────
 * Login — "Welcome Back to the Soil"
 *
 * Split-screen editorial layout.
 * Left: Full-bleed warm photograph with overlaid quote.
 * Right: Toasted Grain form with underline inputs.
 *
 * This should feel like entering a members-only
 * agricultural cooperative, not a SaaS login.
 * ───────────────────────────────────────────── */

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-toasted-grain">

      {/* ═══════════════════════════════════════
       * LEFT — Editorial Photograph
       * ═══════════════════════════════════════ */}
      <div className="relative w-full lg:w-1/2 h-[30vh] lg:h-screen">
        <Image
          src="/images/login-editorial.png"
          alt="Weathered hands holding freshly harvested cassava roots at golden hour"
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
        {/* Subtle dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Editorial Quote */}
        <p className="absolute bottom-8 left-8 right-8 font-heading text-xl lg:text-2xl text-toasted-grain/90 font-medium italic leading-snug">
          &ldquo;Every harvest begins with trust.&rdquo;
        </p>
      </div>

      {/* ═══════════════════════════════════════
       * RIGHT — Login Form
       * ═══════════════════════════════════════ */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative">
        {/* On mobile: form card overlaps the photo by 24px */}
        <div className="w-full max-w-md px-8 lg:px-12 py-12 lg:py-0 -mt-6 lg:mt-0 bg-toasted-grain lg:bg-transparent squircle lg:rounded-none relative z-10">

          {/* Wordmark */}
          <Link href="/" className="inline-block mb-12">
            <span className="font-heading text-[20px] font-semibold text-forest-moss tracking-wide">
              Harvest–Link
            </span>
          </Link>

          {/* Page Title */}
          <h1 className="font-heading text-4xl lg:text-[36px] font-semibold text-deep-charcoal leading-tight">
            Welcome Back
            <br />
            to the Soil
          </h1>
          <p className="font-body text-[14px] text-warm-gray mt-3">
            Sign in to continue where you left off.
          </p>

          {/* ── Form ─────────────────────────── */}
          <form className="mt-10 space-y-8" onSubmit={(e) => e.preventDefault()}>

            {/* Email Field */}
            <div className="relative">
              <label className="input-label block mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="input-underline"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            {/* Passphrase Field */}
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <label className="input-label">
                  Passphrase
                </label>
                <Link
                  href="#"
                  className="font-body text-[11px] text-warm-gray hover:text-forest-moss transition-colors tracking-[0.5px]"
                >
                  Forgot your passphrase?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input-underline pr-10"
                  placeholder="Enter your passphrase"
                  autoComplete="current-password"
                />
                {/* Eye Toggle — line-art style */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-warm-gray hover:text-forest-moss transition-colors"
                  aria-label={showPassword ? "Hide passphrase" : "Show passphrase"}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 3L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M10 5C5.5 5 2 10 2 10C2 10 3.5 12.5 6 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M8.5 9.5C8.5 9.5 9 8 10 8C11 8 12 9 12 10C12 11 11.5 11.5 11.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M14 8C16.5 9 18 10 18 10C18 10 14.5 15 10 15C9 15 8.5 14.8 8 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M2 10C2 10 5.5 5 10 5C14.5 5 18 10 18 10C18 10 14.5 15 10 15C5.5 15 2 10 2 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              className="btn-forest-moss squircle w-full py-4 text-[15px] font-medium mt-4"
            >
              Return to Your Harvest
            </button>
          </form>

          {/* ── Bottom Links ──────────────── */}
          <div className="mt-8 space-y-4">
            {/* Google Login */}
            <button className="btn-outlined squircle w-full py-3.5 text-[14px] flex items-center justify-center gap-3 !border-warm-border-light hover:!border-forest-moss">
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9.003 18z" fill="#34A853"/>
                <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.002 0 5.48 0 2.438 2.017.956 4.958L3.964 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            {/* Switch to signup */}
            <p className="text-center font-body text-[14px] text-warm-gray">
              No account yet?{" "}
              <Link href="/auth/signup" className="text-burnt-clay font-medium hover:underline">
                Join the harvest.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
