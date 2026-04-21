import Link from "next/link";
import Image from "next/image";

/* ─────────────────────────────────────────────
 * Hero — "Closing the Distance"
 *
 * Full-bleed editorial hero at 85vh.
 * Headline bottom-left aligned like a magazine cover.
 * No search bar. No floating badges.
 * Just the image, the words, and two deliberate CTAs.
 * ───────────────────────────────────────────── */

export default function Hero() {
  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-end overflow-hidden">

      {/* ── Background Image ─────────────── */}
      <Image
        src="/images/nrd-D6Tu_L3chLE-unsplash.jpg"
        alt="Nigerian farmland at golden hour — rows of crops stretching toward the horizon"
        fill
        className="object-cover animate-unfurl"
        priority
        quality={85}
        sizes="100vw"
      />

      {/* ── Warm Gradient Overlay ────────── */}
      {/* Subtle warm-to-dark, never green */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* ── Content — Bottom-Left Aligned ── */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="max-w-3xl">

          {/* Headline — Cormorant Garamond, editorial scale */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-semibold text-toasted-grain leading-[1.05] tracking-tight animate-fade-up">
            Closing the Distance
            <br />
            Between Soil and Table.
          </h1>

          {/* Subtitle — Space Grotesk, precise */}
          <p className="mt-6 font-body text-[15px] md:text-[16px] text-toasted-grain/70 tracking-[0.5px] max-w-xl animate-fade-up-delay-1">
            Location-matched produce. From harvest to your hands in hours, not days.
          </p>

          {/* CTAs — Embossed labels, not SaaS buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up-delay-2">
            <Link
              href="/auth/signup?role=farmer"
              className="btn-burnt-clay squircle-pill px-8 py-4 text-[14px] text-center"
            >
              Secure Your Harvest
            </Link>
            <Link
              href="/auth/signup?role=buyer"
              className="btn-outlined squircle-pill px-8 py-4 text-[14px] text-center !text-toasted-grain !border-toasted-grain/50 hover:!bg-toasted-grain/10"
            >
              Access Nearby Soil
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}