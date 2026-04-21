import Link from "next/link";

/* ─────────────────────────────────────────────
 * Two Worlds — Farmer & Consumer Value Props
 *
 * Two large squircle cards side by side.
 * Inner-glow surfaces. No borders.
 * Editorial copy, not startup-speak.
 * ───────────────────────────────────────────── */

const FARMER_POINTS = [
  "List produce in seconds — no middlemen",
  "Reach buyers within 15km automatically",
  "AI-estimated shelf life builds buyer trust",
];

const CONSUMER_POINTS = [
  "Farm-gate pricing — no markup chains",
  "See exactly when it was picked",
  "Verified local farms, transparent sourcing",
];

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="flex-shrink-0 mt-0.5"
    >
      <circle cx="10" cy="10" r="10" fill="#2D4739" opacity="0.1" />
      <path
        d="M6 10.5L8.5 13L14 7.5"
        stroke="#2D4739"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TwoWorlds() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Section Title */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-deep-charcoal">
            Two Worlds, One Link
          </h2>
          <p className="mt-4 font-body text-[15px] text-warm-gray tracking-[0.3px]">
            Whether you grow it or source it — the distance is shorter than you think.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

          {/* ── Farmer Card ──────────────── */}
          <div className="card-surface-solid squircle p-10 lg:p-14 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_16px_48px_rgba(26,26,26,0.08)]">
            <p className="font-body text-[11px] font-medium tracking-[1.5px] uppercase text-burnt-clay mb-4">
              For Farmers
            </p>
            <h3 className="font-heading text-3xl lg:text-4xl font-semibold text-deep-charcoal mb-8">
              Stop Losing
              <br />
              Your Harvest.
            </h3>
            <ul className="space-y-5 mb-10">
              {FARMER_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="font-body text-[15px] text-warm-gray leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/auth/signup?role=farmer"
              className="btn-burnt-clay squircle-pill inline-block px-8 py-3.5 text-[14px]"
            >
              Begin Selling
            </Link>
          </div>

          {/* ── Consumer Card ────────────── */}
          <div className="card-surface-solid squircle p-10 lg:p-14 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_16px_48px_rgba(26,26,26,0.08)]">
            <p className="font-body text-[11px] font-medium tracking-[1.5px] uppercase text-forest-moss mb-4">
              For Consumers
            </p>
            <h3 className="font-heading text-3xl lg:text-4xl font-semibold text-deep-charcoal mb-8">
              Know Exactly What
              <br />
              You&apos;re Eating.
            </h3>
            <ul className="space-y-5 mb-10">
              {CONSUMER_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="font-body text-[15px] text-warm-gray leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/auth/signup?role=buyer"
              className="btn-forest-moss squircle-pill inline-block px-8 py-3.5 text-[14px]"
            >
              Find Nearby Farms
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
