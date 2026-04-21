/* ─────────────────────────────────────────────
 * How It Works — Horizontal Timeline
 *
 * Three steps with thin connecting lines.
 * Line-art circular icons, not filled.
 * Cormorant Garamond titles, Space Grotesk body.
 * ───────────────────────────────────────────── */

const STEPS = [
  {
    icon: (
      /* Hand-drawn style: seedling / plant */
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 24V14"
          stroke="#2D4739"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M16 18C16 18 12 16 10 12C10 12 14 10 16 14"
          stroke="#2D4739"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 16C16 16 20 14 22 10C22 10 18 8 16 12"
          stroke="#2D4739"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 24H20"
          stroke="#2D4739"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Farmer Lists Produce",
    description:
      "A farmer adds their fresh harvest with GPS coordinates, photos, and an AI-estimated shelf life — in under 60 seconds.",
  },
  {
    icon: (
      /* Hand-drawn style: location/radius */
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle
          cx="16"
          cy="14"
          r="4"
          stroke="#2D4739"
          strokeWidth="1.5"
        />
        <path
          d="M16 6C11.58 6 8 9.58 8 14C8 19.5 16 26 16 26C16 26 24 19.5 24 14C24 9.58 20.42 6 16 6Z"
          stroke="#2D4739"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Platform Matches Buyers",
    description:
      "Our system automatically surfaces that produce to consumers within a 15km optimal delivery radius. No searching required.",
  },
  {
    icon: (
      /* Hand-drawn style: handshake / connect */
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M8 18L12 14L16 18L20 14L24 18"
          stroke="#2D4739"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 14H10"
          stroke="#2D4739"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M22 14H26"
          stroke="#2D4739"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="16" cy="10" r="2" stroke="#2D4739" strokeWidth="1.5" />
      </svg>
    ),
    title: "Direct Coordination",
    description:
      "Buyer and farmer connect directly. No middlemen. Fresh produce moves from field to table in hours, not days.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-deep-charcoal">
            How It Works
          </h2>
          <p className="mt-4 font-body text-[15px] text-warm-gray tracking-[0.3px]">
            Three steps. Zero waste. Fresh to your table.
          </p>
        </div>

        {/* Timeline */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-6 relative">

          {/* ── Connecting Lines (desktop only) ── */}
          <div className="hidden md:block absolute top-[36px] left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-[1px] bg-warm-border" />

          {STEPS.map((step, index) => (
            <div key={index} className="text-center relative">

              {/* Icon Circle */}
              <div className="inline-flex items-center justify-center w-[72px] h-[72px] rounded-full border border-warm-border bg-toasted-grain mb-8 relative z-10">
                {step.icon}
              </div>

              {/* Step Number */}
              <p className="font-body text-[11px] font-medium tracking-[1.5px] uppercase text-burnt-clay mb-3">
                Step {index + 1}
              </p>

              {/* Title — Cormorant Garamond */}
              <h3 className="font-heading text-2xl font-semibold text-deep-charcoal mb-4">
                {step.title}
              </h3>

              {/* Description — Space Grotesk */}
              <p className="font-body text-[14px] text-warm-gray leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
