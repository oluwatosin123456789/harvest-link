import Image from "next/image";

/* ─────────────────────────────────────────────
 * Freshness Card — Produce Display Component
 *
 * Squircle shape. Frosted surface. No borders.
 * Features the "Freshness Sticker" — a hand-placed
 * circular stamp showing how recently it was picked.
 * Time-to-Table decay bar shows peak freshness window.
 * ───────────────────────────────────────────── */

interface FreshnessCardProps {
  image: string;
  name: string;
  farm: string;
  distance: string;
  price: string;
  pickedHoursAgo: number;
  peakFreshnessHours: number;
  remainingPercent: number;
  sellingFast?: boolean;
  remaining?: number;
}

export default function FreshnessCard({
  image,
  name,
  farm,
  distance,
  price,
  pickedHoursAgo,
  peakFreshnessHours,
  remainingPercent,
  sellingFast = false,
  remaining,
}: FreshnessCardProps) {
  return (
    <div className="squircle card-surface group transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_16px_48px_rgba(26,26,26,0.08)] overflow-hidden w-full max-w-[320px]">

      {/* ── Produce Image ────────────────── */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={`Fresh ${name} from ${farm}`}
          fill
          className="object-cover animate-unfurl group-hover:brightness-[1.05] transition-all duration-500"
          sizes="320px"
        />

        {/* Warm overlay on hover */}
        <div className="absolute inset-0 bg-amber-900/0 group-hover:bg-amber-900/5 transition-all duration-500" />

        {/* ── Freshness Sticker ──────────── */}
        <div
          className={`freshness-sticker absolute bottom-3 left-3 w-[72px] h-[72px] rounded-full flex flex-col items-center justify-center ${
            sellingFast ? "bg-burnt-clay" : "bg-forest-moss"
          }`}
        >
          {sellingFast ? (
            <>
              <span className="font-body text-[9px] font-medium tracking-[0.8px] uppercase text-toasted-grain opacity-80">
                Only
              </span>
              <span className="font-body text-[13px] font-bold text-toasted-grain leading-none">
                {remaining}
              </span>
              <span className="font-body text-[9px] font-medium tracking-[0.8px] uppercase text-toasted-grain opacity-80">
                Left
              </span>
            </>
          ) : (
            <>
              {/* Clock icon */}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mb-0.5">
                <circle cx="6" cy="6" r="5" stroke="#F5EFE6" strokeWidth="1" />
                <path d="M6 3V6L8 7.5" stroke="#F5EFE6" strokeWidth="1" strokeLinecap="round" />
              </svg>
              <span className="font-body text-[8px] font-medium tracking-[0.5px] uppercase text-toasted-grain leading-tight text-center">
                Picked
                <br />
                {pickedHoursAgo}h ago
              </span>
            </>
          )}
        </div>
      </div>

      {/* ── Card Content ─────────────────── */}
      <div className="p-5">

        {/* Produce Name */}
        <h3 className="font-heading text-xl font-semibold text-deep-charcoal">
          {name}
        </h3>

        {/* Farm Name */}
        <p className="font-body text-[12px] text-warm-gray mt-1">
          {farm}
        </p>

        {/* Separator */}
        <div className="w-full h-[1px] bg-warm-border my-4" />

        {/* Distance & Price Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1.5C4.79 1.5 3 3.29 3 5.5C3 8.5 7 12.5 7 12.5C7 12.5 11 8.5 11 5.5C11 3.29 9.21 1.5 7 1.5Z"
                stroke="#1A1A1A"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <circle cx="7" cy="5.5" r="1.5" stroke="#1A1A1A" strokeWidth="1" />
            </svg>
            <span className="font-body text-[13px] text-deep-charcoal">
              {distance}
            </span>
          </div>
          <span className="font-body text-[13px] font-semibold text-deep-charcoal">
            {price}
          </span>
        </div>

        {/* Time-to-Table Bar */}
        <div className="mt-4">
          <div className="w-full h-[3px] bg-warm-border rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${remainingPercent}%`,
                background: `linear-gradient(90deg, #2D4739, #FFC107)`,
              }}
            />
          </div>
          <p className="font-body text-[11px] text-warm-gray mt-2">
            Estimated {peakFreshnessHours} hours of peak freshness
          </p>
        </div>

        {/* CTA */}
        <button className="btn-burnt-clay squircle-sm w-full py-3 mt-5 text-[13px] font-medium">
          Reserve This Basket
        </button>
      </div>
    </div>
  );
}
