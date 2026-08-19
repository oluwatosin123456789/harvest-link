import { freshnessColor, freshnessLabel } from "@/lib/demo-data";

/* ─────────────────────────────────────────────
 * Freshness badge
 *
 * The Fresco estimate, rendered the same way
 * everywhere it appears — farmer, marketplace,
 * checkout — so a buyer learns to read one thing.
 *
 * Always paired with the word "estimate": this is an
 * AI assessment, never a food-safety certification.
 * ───────────────────────────────────────────── */

export default function FreshnessBadge({
  score,
  size = "sm",
  showLabel = true,
}: {
  score: number;
  size?: "sm" | "lg";
  showLabel?: boolean;
}) {
  const color = freshnessColor(score);

  if (size === "lg") {
    return (
      <div className="flex items-center gap-3">
        <div
          className="grid size-14 shrink-0 place-items-center rounded-full border-[3px]"
          style={{ borderColor: color }}
        >
          <span className="font-heading text-xl leading-none">{score}</span>
        </div>
        <div>
          <p className="u-label">Fresco estimate</p>
          <p className="mt-0.5 text-sm font-medium" style={{ color }}>
            {freshnessLabel(score)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium">
      <span className="size-1.5 rounded-full" style={{ background: color }} />
      <span style={{ color }}>
        Freshness estimate {score}
        {showLabel && ` · ${freshnessLabel(score)}`}
      </span>
    </span>
  );
}
