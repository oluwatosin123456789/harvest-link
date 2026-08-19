import React from "react";

export default function ScannerPreview() {
  return (
    <section className="py-24 lg:py-32 bg-toasted-grain overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Phone Mockup */}
          <div className="relative mx-auto w-full max-w-[320px] aspect-[1/2] bg-deep-charcoal rounded-[40px] border-[8px] border-deep-charcoal shadow-2xl overflow-hidden flex flex-col justify-end p-4">
            {/* Camera Viewfinder Fake */}
            <div className="absolute inset-0 bg-forest-moss/20">
              <div className="absolute top-12 left-6 right-6 bottom-32 border-2 border-white/40 border-dashed rounded-xl animate-border-pulse" />
              {/* Fake scanning line */}
              <div className="absolute top-12 left-6 right-6 h-1 bg-white/60 shadow-[0_0_10px_rgba(255,255,255,0.8)] rounded-full shimmer-scan" />
            </div>

            {/* Scanning Indicator */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md text-white text-[11px] uppercase tracking-wider px-4 py-1.5 rounded-full z-10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sun-yellow animate-pulse" />
              Scanning...
            </div>

            {/* Result Card overlaying bottom */}
            <div className="relative z-10 bg-white squircle-sm p-5 shadow-lg transform translate-y-2 animate-fade-up" style={{ animationDelay: "1s" }}>
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-heading text-xl font-bold text-deep-charcoal">Freshness</h4>
                <span className="text-forest-moss font-bold text-lg">84/100</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-forest-moss" />
                <span className="font-body text-[13px] text-deep-charcoal font-medium">Excellent</span>
              </div>
              <p className="font-body text-[12px] text-warm-gray">
                Est. 4 days shelf life
              </p>
            </div>
          </div>

          {/* Right Side: Text */}
          <div>
            <span className="font-body text-[11px] font-medium tracking-[1.5px] uppercase text-burnt-clay mb-4 block">
              Fresco: AI Produce Intelligence
            </span>
            <h2 className="font-heading text-4xl lg:text-5xl font-semibold text-deep-charcoal leading-tight mb-8">
              Every scan builds the farmer&apos;s financial record.
            </h2>
            
            <ul className="space-y-6 mb-10">
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-grain-white flex items-center justify-center border border-warm-gray/20">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D4739" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                </div>
                <div>
                  <h4 className="font-heading text-xl font-semibold text-deep-charcoal mb-1">Visual signals from the photo</h4>
                  <p className="font-body text-[14px] text-warm-gray leading-relaxed">Extracts color, texture, and bruising indicators in real-time.</p>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-grain-white flex items-center justify-center border border-warm-gray/20">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D4739" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <h4 className="font-heading text-xl font-semibold text-deep-charcoal mb-1">Contextual data from location</h4>
                  <p className="font-body text-[14px] text-warm-gray leading-relaxed">Factors in local weather, humidity, and distance to market.</p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-grain-white flex items-center justify-center border border-warm-gray/20">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D4739" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                </div>
                <div>
                  <h4 className="font-heading text-xl font-semibold text-deep-charcoal mb-1">A learning model</h4>
                  <p className="font-body text-[14px] text-warm-gray leading-relaxed">Improves its accuracy with every accepted delivery and rating.</p>
                </div>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </section>
  );
}
