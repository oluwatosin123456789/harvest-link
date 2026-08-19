import React from "react";

export default function FourLayers() {
  return (
    <section className="py-24 lg:py-32 bg-toasted-grain">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-deep-charcoal">
            Four Layers. One Pipeline.
          </h2>
          <p className="mt-4 font-body text-[15px] text-warm-gray tracking-[0.3px] max-w-2xl mx-auto">
            How we convert agricultural activity into a structured financial identity.
          </p>
        </div>

        <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-8 lg:gap-4">
          {/* Connector line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-warm-gray/20 lg:hidden" />
          <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[2px] bg-warm-gray/20" />

          {/* Layer 1 */}
          <div className="relative z-10 w-full max-w-[280px] card-surface-solid squircle p-8 border-t-4 border-forest-moss bg-grain-white shadow-sm flex flex-col">
            <span className="font-body text-[11px] font-medium tracking-[1.5px] uppercase text-forest-moss mb-3">Layer 1</span>
            <h3 className="font-heading text-2xl font-semibold text-deep-charcoal mb-3">Agricultural Marketplace</h3>
            <p className="font-body text-[14px] text-warm-gray leading-relaxed">Creates verifiable economic activity between farmers and buyers.</p>
            {/* Arrow for mobile */}
            <div className="lg:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 text-warm-gray/50">↓</div>
            {/* Arrow for desktop */}
            <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-warm-gray/50">→</div>
          </div>

          {/* Layer 2 */}
          <div className="relative z-10 w-full max-w-[280px] card-surface-solid squircle p-8 border-t-4 border-burnt-clay bg-grain-white shadow-sm flex flex-col mt-4 lg:mt-0">
            <span className="font-body text-[11px] font-medium tracking-[1.5px] uppercase text-burnt-clay mb-3">Layer 2</span>
            <h3 className="font-heading text-2xl font-semibold text-deep-charcoal mb-3">Fresco Quality Intelligence</h3>
            <p className="font-body text-[14px] text-warm-gray leading-relaxed">Verifies produce quality and enriches data with AI estimations.</p>
            <div className="lg:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 text-warm-gray/50">↓</div>
            <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-warm-gray/50">→</div>
          </div>

          {/* Layer 3 */}
          <div className="relative z-10 w-full max-w-[280px] card-surface-solid squircle p-8 border-t-4 border-sun-yellow bg-grain-white shadow-sm flex flex-col mt-4 lg:mt-0">
            <span className="font-body text-[11px] font-medium tracking-[1.5px] uppercase text-[#D4A000] mb-3">Layer 3</span>
            <h3 className="font-heading text-2xl font-semibold text-deep-charcoal mb-3">Farmer Financial Passport</h3>
            <p className="font-body text-[14px] text-warm-gray leading-relaxed">Structures every transaction into a coherent financial record.</p>
            <div className="lg:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 text-warm-gray/50">↓</div>
            <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-warm-gray/50">→</div>
          </div>

          {/* Layer 4 */}
          <div className="relative z-10 w-full max-w-[280px] card-surface-solid squircle p-8 border-t-4 border-deep-charcoal bg-grain-white shadow-sm flex flex-col mt-4 lg:mt-0">
            <span className="font-body text-[11px] font-medium tracking-[1.5px] uppercase text-deep-charcoal mb-3">Layer 4</span>
            <h3 className="font-heading text-2xl font-semibold text-deep-charcoal mb-3">Wema Bank Dashboard</h3>
            <p className="font-body text-[14px] text-warm-gray leading-relaxed">Makes invisible farmers visible to formal finance for credit evaluation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
