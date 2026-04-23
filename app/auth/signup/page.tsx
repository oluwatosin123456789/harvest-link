"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

/* ─────────────────────────────────────────────
 * Signup — "Begin Your Connection"
 *
 * Split-screen editorial layout.
 * Left: Full-bleed market photograph with quote.
 * Right: Role selector ("I Grow" / "I Source")
 *        + underline form fields.
 *
 * The role selection that was previously on
 * /auth/select-type is now integrated here.
 * ───────────────────────────────────────────── */

type UserRole = "farmer" | "consumer" | null;

export default function SignupPage() {
  const [role, setRole] = useState<UserRole>(null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-toasted-grain">

      {/* ═══════════════════════════════════════
       * LEFT — Editorial Photograph
       * ═══════════════════════════════════════ */}
      <div className="relative w-full lg:w-1/2 h-[30vh] lg:h-screen">
        <Image
          src="/images/signup-editorial.png"
          alt="Vibrant Nigerian market scene with colorful produce stalls at golden hour"
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <p className="absolute bottom-8 left-8 right-8 font-heading text-xl lg:text-2xl text-toasted-grain/90 font-medium italic leading-snug">
          &ldquo;The distance is shorter than you think.&rdquo;
        </p>
      </div>

      {/* ═══════════════════════════════════════
       * RIGHT — Signup Form
       * ═══════════════════════════════════════ */}
      <div className="w-full lg:w-1/2 flex items-start lg:items-center justify-center relative overflow-y-auto">
        <div className="w-full max-w-md px-8 lg:px-12 py-12 lg:py-16 -mt-6 lg:mt-0 bg-toasted-grain lg:bg-transparent squircle lg:rounded-none relative z-10">

          {/* Wordmark */}
          <Link href="/" className="inline-block mb-10">
            <span className="font-heading text-[20px] font-semibold text-forest-moss tracking-wide">
              Harvest–Link
            </span>
          </Link>

          {/* Page Title */}
          <h1 className="font-heading text-4xl lg:text-[36px] font-semibold text-deep-charcoal leading-tight">
            Begin Your
            <br />
            Connection
          </h1>
          <p className="font-body text-[14px] text-warm-gray mt-3">
            Choose how you want to connect with the land.
          </p>

          {/* ── Role Selector ────────────────── */}
          <div className="mt-8 grid grid-cols-2 gap-4">

            {/* I Grow (Farmer) */}
            <button
              onClick={() => setRole("farmer")}
              className={`squircle-sm p-5 text-left transition-all duration-300 ${
                role === "farmer"
                  ? "bg-grain-white border-l-[3px] border-burnt-clay shadow-[inset_0_0_16px_rgba(179,84,30,0.06)]"
                  : "bg-warm-border/30 border-l-[3px] border-transparent hover:bg-warm-border/50"
              }`}
            >
              {/* Seedling Icon */}
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="mb-3">
                <path
                  d="M14 22V12"
                  stroke={role === "farmer" ? "#B3541E" : "#6B6560"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M14 16C14 16 10 14 8 10C8 10 12 8 14 12"
                  stroke={role === "farmer" ? "#B3541E" : "#6B6560"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 14C14 14 18 12 20 8C20 8 16 6 14 10"
                  stroke={role === "farmer" ? "#B3541E" : "#6B6560"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className={`font-heading text-lg font-semibold ${
                role === "farmer" ? "text-burnt-clay" : "text-deep-charcoal"
              }`}>
                I Grow
              </p>
              <p className="font-body text-[11px] text-warm-gray mt-1">
                Farmer / Producer
              </p>
            </button>

            {/* I Source (Consumer) */}
            <button
              onClick={() => setRole("consumer")}
              className={`squircle-sm p-5 text-left transition-all duration-300 ${
                role === "consumer"
                  ? "bg-grain-white border-l-[3px] border-forest-moss shadow-[inset_0_0_16px_rgba(45,71,57,0.06)]"
                  : "bg-warm-border/30 border-l-[3px] border-transparent hover:bg-warm-border/50"
              }`}
            >
              {/* Basket Icon */}
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="mb-3">
                <path
                  d="M6 12H22L20 22H8L6 12Z"
                  stroke={role === "consumer" ? "#2D4739" : "#6B6560"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 12V8C10 6.89543 10.8954 6 12 6H16C17.1046 6 18 6.89543 18 8V12"
                  stroke={role === "consumer" ? "#2D4739" : "#6B6560"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11 16V18"
                  stroke={role === "consumer" ? "#2D4739" : "#6B6560"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M17 16V18"
                  stroke={role === "consumer" ? "#2D4739" : "#6B6560"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <p className={`font-heading text-lg font-semibold ${
                role === "consumer" ? "text-forest-moss" : "text-deep-charcoal"
              }`}>
                I Source
              </p>
              <p className="font-body text-[11px] text-warm-gray mt-1">
                Buyer / Consumer
              </p>
            </button>
          </div>

          {/* ── Form Fields ──────────────────── */}
          <form className="mt-8 space-y-7" onSubmit={(e) => e.preventDefault()}>

            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="input-label block mb-2">First Name</label>
                <input type="text" className="input-underline" placeholder="Adebayo" autoComplete="given-name" />
              </div>
              {/* Last Name */}
              <div>
                <label className="input-label block mb-2">Last Name</label>
                <input type="text" className="input-underline" placeholder="Okafor" autoComplete="family-name" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="input-label block mb-2">Email Address</label>
              <input type="email" className="input-underline" placeholder="you@example.com" autoComplete="email" />
            </div>

            {/* Passphrase */}
            <div>
              <label className="input-label block mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input-underline pr-10"
                  placeholder="Create a secure passphrase"
                  autoComplete="new-password"
                />
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

            {/* Dynamic CTA */}
            <button
              type="submit"
              disabled={!role}
              className={`squircle w-full py-4 text-[15px] font-medium transition-all duration-300 ${
                role === "farmer"
                  ? "btn-burnt-clay"
                  : role === "consumer"
                  ? "btn-forest-moss"
                  : "bg-warm-border text-warm-gray cursor-not-allowed"
              }`}
            >
              {role === "farmer"
                ? "Secure Your Harvest"
                : role === "consumer"
                ? "Access Nearby Soil"
                : "Select a role above"}
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

            <p className="text-center font-body text-[14px] text-warm-gray">
              Already connected?{" "}
              <Link href="/auth/login" className="text-forest-moss font-medium hover:underline">
                Return here.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
