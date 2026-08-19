import React from "react";

export default function ProblemStatement() {
  return (
    <section className="py-24 lg:py-32 bg-grain-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        <div className="animate-fade-up">
          <h2 className="font-heading text-[120px] md:text-[200px] leading-none font-bold text-deep-charcoal/10 tracking-tighter mb-4">
            50%
          </h2>
          <p className="font-heading text-3xl md:text-5xl font-semibold text-deep-charcoal max-w-3xl mx-auto leading-tight mb-16">
            of fresh produce in Nigeria is lost before it reaches a plate
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Matching Fails */}
          <div className="card-surface squircle p-8 animate-fade-up" style={{ animationDelay: "100ms" }}>
            <h3 className="font-heading text-2xl font-semibold text-burnt-clay mb-3">Matching Fails</h3>
            <p className="font-body text-[15px] text-warm-gray leading-relaxed">
              Farmers can&apos;t find buyers in time, leaving ripe produce to rot in the fields.
            </p>
          </div>

          {/* Timing Fails */}
          <div className="card-surface squircle p-8 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <h3 className="font-heading text-2xl font-semibold text-sun-yellow mb-3">Timing Fails</h3>
            <p className="font-body text-[15px] text-warm-gray leading-relaxed">
              No one knows exactly how long produce will last, leading to pricing and trust issues.
            </p>
          </div>

          {/* Distance Fails */}
          <div className="card-surface squircle p-8 animate-fade-up" style={{ animationDelay: "300ms" }}>
            <h3 className="font-heading text-2xl font-semibold text-forest-moss mb-3">Distance Fails</h3>
            <p className="font-body text-[15px] text-warm-gray leading-relaxed">
              Perishable goods travel too far, losing freshness and value with every mile.
            </p>
          </div>
        </div>

        <p className="font-body text-[12px] text-warm-gray uppercase tracking-[1px] animate-fade-up" style={{ animationDelay: "400ms" }}>
          Source: USAID, 2024 · NSPRI
        </p>
      </div>
    </section>
  );
}
