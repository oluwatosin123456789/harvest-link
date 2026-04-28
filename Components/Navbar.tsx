"use client";

import Link from "next/link";
import { useState, useEffect } from "react";



export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 nav-transition ${
          scrolled
            ? "bg-toasted-grain shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-b border-warm-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">

            {/* ── Wordmark ────────────────────── */}
            <Link href="/" className="font-heading text-[22px] font-semibold tracking-wide">
              <span className={scrolled ? "text-forest-moss" : "text-toasted-grain"}>
                Harvest
              </span>
              <span className={`mx-1 ${scrolled ? "text-warm-gray" : "text-toasted-grain/50"}`}>
                –
              </span>
              <span className={scrolled ? "text-forest-moss" : "text-toasted-grain"}>
                Link
              </span>
            </Link>

            {/* ── Desktop Navigation ──────────── */}
            <div className="hidden md:flex items-center gap-1">
              {["HOW IT WORKS", "THE MAP", "FOR FARMERS"].map((item, i) => (
                <span key={item} className="flex items-center">
                  {i > 0 && (
                    <span className={`mx-4 text-xs ${scrolled ? "text-warm-gray" : "text-toasted-grain/40"}`}>
                      ·
                    </span>
                  )}
                  <Link
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`font-body text-[13px] font-medium tracking-[0.8px] transition-colors duration-300 ${
                      scrolled
                        ? "text-deep-charcoal hover:text-forest-moss"
                        : "text-toasted-grain/90 hover:text-toasted-grain"
                    }`}
                  >
                    {item}
                  </Link>
                </span>
              ))}
            </div>

            {/* ── Desktop Actions ─────────────── */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/auth/login"
                className={`font-body text-[14px] font-medium transition-colors duration-300 ${
                  scrolled ? "text-deep-charcoal hover:text-forest-moss" : "text-toasted-grain/90 hover:text-toasted-grain"
                }`}
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="btn-burnt-clay squircle-pill px-6 py-2.5 text-[13px] inline-block"
              >
                Secure Your Harvest
              </Link>
            </div>

            {/* ── Mobile Hamburger ─────────────── */}
            {/* Two lines, not three. Longer top, shorter bottom offset right. */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden flex flex-col items-end gap-[6px] p-2"
              aria-label="Open menu"
            >
              <span className={`block h-[2px] w-7 transition-colors ${scrolled ? "bg-deep-charcoal" : "bg-toasted-grain"}`} />
              <span className={`block h-[2px] w-5 transition-colors ${scrolled ? "bg-deep-charcoal" : "bg-toasted-grain"}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu — Full-Screen Takeover ── */}
      <div
        className={`fixed inset-0 z-[100] bg-forest-moss transition-all duration-500 ease-in-out flex flex-col ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center px-6 h-20">
          <span className="font-heading text-[22px] font-semibold text-toasted-grain tracking-wide">
            Harvest–Link
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-toasted-grain text-3xl font-light p-2"
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* Mobile Nav Links — Serif for dramatic effect */}
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          {[
            { label: "How It Works", href: "#how-it-works" },
            { label: "The Map", href: "#the-map" },
            { label: "For Farmers", href: "#for-farmers" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="font-heading text-[32px] text-toasted-grain font-medium leading-[48px] hover:text-sun-yellow transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile CTAs */}
        <div className="px-8 pb-12 space-y-4">
          <Link
            href="/auth/login"
            onClick={() => setMobileOpen(false)}
            className="block text-center font-body text-toasted-grain text-[16px] underline underline-offset-4 py-3"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            onClick={() => setMobileOpen(false)}
            className="btn-burnt-clay squircle block text-center py-4 text-[15px]"
          >
            Secure Your Harvest
          </Link>
        </div>
      </div>
    </>
  );
}