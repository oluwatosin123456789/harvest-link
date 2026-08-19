/* ─────────────────────────────────────────────
 * Map Preview — Contained Sand-Toned Viewport
 *
 * NOT a full-screen Google Maps clone.
 * A stylized, contained viewport at ~70% width.
 * Sand-toned monochrome with squircle Farm Pins.
 * CSS/SVG-based — no Mapbox API needed for preview.
 * ───────────────────────────────────────────── */

/* ── Farm Pin Data ──────────────────────────── */
const PINS = [
  { x: 25, y: 35, name: "Adeyemi Farm", items: 4 },
  { x: 55, y: 25, name: "Okafor Organics", items: 7 },
  { x: 72, y: 55, name: "Ibrahim Tubers", items: 3 },
  { x: 38, y: 65, name: "Blessing Greens", items: 5 },
  { x: 62, y: 42, name: "Chukwu Heritage", items: 6, expanded: true },
];

function FarmPin({
  x,
  y,
  name,
  items,
  expanded,
}: {
  x: number;
  y: number;
  name: string;
  items: number;
  expanded?: boolean;
}) {
  return (
    <div
      className="absolute group"
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
    >
      {/* Pin Marker */}
      <div className="w-10 h-10 bg-forest-moss squircle-sm flex items-center justify-center cursor-pointer transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M9 3C9 3 5 7 5 9C5 11 7 13 9 15C11 13 13 11 13 9C13 7 9 3 9 3Z"
            stroke="#F5EFE6"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="9" r="1.5" fill="#F5EFE6" />
        </svg>
      </div>

      {/* Expanded Card (shown for one pin, hover for others) */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-[200px] transition-all duration-300
          ${expanded
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
          }`}
      >
        <div className="card-surface-solid squircle-sm p-4">
          {/* Thin connecting line to pin */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-[1px] h-3 bg-warm-border" />

          <p className="font-heading text-[15px] font-semibold text-deep-charcoal">
            {name}
          </p>
          <p className="font-body text-[12px] text-warm-gray mt-1">
            {items} items available
          </p>
          <p className="font-body text-[12px] text-burnt-clay mt-2 cursor-pointer hover:underline">
            View Farm →
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MapPreview() {
  return (
    <section id="the-map" className="py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Section Title */}
        <div className="text-center mb-16 relative">
          <div className="inline-block mb-4 px-3 py-1 bg-[#DDA63A]/10 border border-[#DDA63A]/30 rounded-full font-body text-[11px] font-bold text-[#BF8B2E] uppercase tracking-wider">
            Launching in Southwest Nigeria
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-deep-charcoal">
            Discover What&apos;s Growing Near You
          </h2>
          <p className="mt-4 font-body text-[15px] text-warm-gray tracking-[0.3px]">
            Every pin is a farmer. Every farm is within reach.
          </p>
        </div>

        {/* Map Container — 70% width, centered, squircle */}
        <div className="max-w-[1000px] mx-auto">
          <div className="squircle overflow-hidden shadow-[0_12px_48px_rgba(26,26,26,0.06)] relative">

            {/* Stylized Map Background */}
            <div
              className="relative w-full aspect-[16/9] overflow-hidden"
              style={{
                background: `
                  radial-gradient(ellipse at 30% 40%, rgba(200, 213, 192, 0.3) 0%, transparent 60%),
                  radial-gradient(ellipse at 70% 60%, rgba(200, 213, 192, 0.2) 0%, transparent 50%),
                  #F5EFE6
                `,
              }}
            >
              {/* Roads — horizontal and vertical lines */}
              <svg
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                {/* Major roads */}
                <line x1="0%" y1="45%" x2="100%" y2="45%" stroke="#E0D8CC" strokeWidth="2" />
                <line x1="35%" y1="0%" x2="35%" y2="100%" stroke="#E0D8CC" strokeWidth="2" />
                <line x1="65%" y1="0%" x2="80%" y2="100%" stroke="#E0D8CC" strokeWidth="1.5" />

                {/* Minor roads */}
                <line x1="0%" y1="30%" x2="50%" y2="25%" stroke="#E0D8CC" strokeWidth="1" opacity="0.6" />
                <line x1="50%" y1="70%" x2="100%" y2="65%" stroke="#E0D8CC" strokeWidth="1" opacity="0.6" />
                <line x1="20%" y1="0%" x2="15%" y2="100%" stroke="#E0D8CC" strokeWidth="1" opacity="0.4" />
                <line x1="80%" y1="0%" x2="85%" y2="60%" stroke="#E0D8CC" strokeWidth="1" opacity="0.4" />

                {/* Water body */}
                <ellipse cx="85%" cy="20%" rx="10%" ry="12%" fill="#C8D5C0" opacity="0.3" />
              </svg>

              {/* Farm Pins */}
              {PINS.map((pin) => (
                <FarmPin key={pin.name} {...pin} />
              ))}

              {/* Area labels */}
              <span className="absolute font-body text-[10px] tracking-[1px] uppercase text-warm-gray/50" style={{ left: "10%", top: "15%" }}>
                Abeokuta
              </span>
              <span className="absolute font-body text-[10px] tracking-[1px] uppercase text-warm-gray/50" style={{ left: "50%", top: "80%" }}>
                Sagamu
              </span>
              <span className="absolute font-body text-[10px] tracking-[1px] uppercase text-warm-gray/50" style={{ left: "78%", top: "75%" }}>
                Ijebu-Ode
              </span>
            </div>

            {/* Status Bar */}
            <div className="bg-grain-white px-6 py-3 flex items-center justify-between border-t border-warm-border">
              <p className="font-body text-[12px] text-warm-gray tracking-[0.3px]">
                Showing <span className="text-deep-charcoal font-medium">12 farms</span> within 15km
              </p>
              <p className="font-body text-[12px] text-burnt-clay cursor-pointer hover:underline">
                Open Full Map →
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
