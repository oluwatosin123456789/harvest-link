"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { useHarvestLink } from "@/app/providers/HarvestLinkProvider";
import { FARMER, SCRIPTED_SCAN, formatNaira } from "@/lib/demo-data";
import FreshnessBadge from "@/Components/product/FreshnessBadge";

/* ─────────────────────────────────────────────
 * Create listing — walkthrough step 3
 *
 * The hinge of the farmer half: the Fresco assessment
 * carries straight in, so the farmer never re-types
 * what the scan already established, and the listing
 * ships with quality evidence attached rather than a
 * claim the buyer has to take on faith.
 * ───────────────────────────────────────────── */

export default function CreateListingPage() {
  const router = useRouter();
  const { scan, publishListing } = useHarvestLink();

  /* Fall back to the scripted scan so the screen is still
   * demonstrable if someone deep-links past the scanner. */
  const assessment = scan ?? { ...SCRIPTED_SCAN, live: false };

  const [produce, setProduce] = useState(assessment.detectedProduce);
  const [variety, setVariety] = useState(assessment.variety ?? "");
  const [quantityKg, setQuantityKg] = useState("40");
  const [pricePerKg, setPricePerKg] = useState("1400");
  const [fulfilment, setFulfilment] = useState<"delivery" | "pickup">("delivery");
  const [publishing, setPublishing] = useState(false);

  const qty = Number(quantityKg) || 0;
  const price = Number(pricePerKg) || 0;
  const canPublish = produce.trim().length > 0 && qty > 0 && price > 0;

  function handlePublish() {
    if (!canPublish) return;
    setPublishing(true);

    const listing = publishListing({
      produce: produce.trim(),
      variety: variety.trim(),
      pricePerKgNgn: price,
      quantityKg: qty,
      farmName: FARMER.farmName,
      distanceKm: FARMER.distanceKm,
      freshnessScore: assessment.freshnessScore,
      freshnessCategory: assessment.freshnessCategory,
      shelfLifeDays: assessment.shelfLifeDays,
      scannedHoursAgo: 0,
    });

    router.push(`/marketplace/${listing.id}`);
  }

  return (
    <div className="mx-auto max-w-md bg-[#F5EFE6] pb-28 text-[#1A1A1A] md:max-w-2xl">
      <header className="flex items-center gap-3 px-5 pb-4 pt-6">
        <Link
          href="/dashboard/farmer/scan"
          aria-label="Back to scanner"
          className="grid size-10 place-items-center rounded-md border border-[#D9D0C3] bg-white"
        >
          <ArrowLeft size={18} aria-hidden="true" />
        </Link>
        <div>
          <p className="u-label">New listing</p>
          <h1 className="font-heading text-[28px] leading-8">Create listing</h1>
        </div>
      </header>

      {/* ── The scan, carried forward ───────────── */}
      <section className="mx-5 flex items-center justify-between gap-4 rounded-lg border border-[#2D4739]/25 bg-[#2D4739]/5 p-4">
        <div>
          <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-[#2D4739]">
            <Check size={13} aria-hidden="true" />
            Fresco quality assessment attached
          </p>
          <p className="mt-1.5 text-sm text-[#4A4A42]">
            {assessment.shelfLifeDays} days estimated shelf life · {assessment.confidence}% confidence
          </p>
          {!assessment.live && (
            <p className="mt-1 text-[11px] text-[#8C8C7A]">
              Using the reference assessment — scan produce to attach a live one.
            </p>
          )}
        </div>
        <FreshnessBadge score={assessment.freshnessScore} size="lg" />
      </section>

      <form
        className="mt-7 space-y-6 px-5"
        onSubmit={(e) => {
          e.preventDefault();
          handlePublish();
        }}
      >
        <Field label="Produce" htmlFor="produce">
          <input
            id="produce"
            value={produce}
            onChange={(e) => setProduce(e.target.value)}
            className="listing-input"
            required
          />
        </Field>

        <Field label="Variety" htmlFor="variety" hint="Optional">
          <input
            id="variety"
            value={variety}
            onChange={(e) => setVariety(e.target.value)}
            placeholder="e.g. Roma"
            className="listing-input"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Quantity" htmlFor="quantity" hint="kg">
            <input
              id="quantity"
              type="number"
              inputMode="numeric"
              min={1}
              value={quantityKg}
              onChange={(e) => setQuantityKg(e.target.value)}
              className="listing-input"
              required
            />
          </Field>
          <Field label="Price per kg" htmlFor="price" hint="₦">
            <input
              id="price"
              type="number"
              inputMode="numeric"
              min={1}
              value={pricePerKg}
              onChange={(e) => setPricePerKg(e.target.value)}
              className="listing-input"
              required
            />
          </Field>
        </div>

        <fieldset>
          <legend className="u-label">Fulfilment</legend>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {(["delivery", "pickup"] as const).map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setFulfilment(method)}
                aria-pressed={fulfilment === method}
                className={`min-h-12 rounded-sm border text-sm font-medium capitalize transition-colors ${
                  fulfilment === method
                    ? "border-[#1A1A1A] bg-[#1A1A1A] text-[#F5EFE6]"
                    : "border-[#D9D0C3] bg-white text-[#1A1A1A] hover:bg-[#EDE4D8]"
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </fieldset>

        {/* ── Running total ───────────────────── */}
        <div className="panel-recessed flex items-center justify-between p-4">
          <div>
            <p className="u-label">Listing value</p>
            <p className="mt-1 text-xs text-[#8C8C7A]">
              {qty}kg × {formatNaira(price)}
            </p>
          </div>
          <p className="font-heading text-[28px] leading-none">{formatNaira(qty * price)}</p>
        </div>
      </form>

      {/* ── Publish ─────────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 border-t border-[#D9D0C3] bg-[#F5EFE6] p-4 md:static md:mt-8 md:border-0 md:bg-transparent md:px-5">
        <div className="mx-auto max-w-md md:max-w-2xl">
          <button
            onClick={handlePublish}
            disabled={!canPublish || publishing}
            className="flex min-h-[52px] w-full items-center justify-center rounded-sm bg-[#2D4739] text-[15px] font-semibold text-[#F5EFE6] transition-colors hover:bg-[#203429] focus:outline-2 focus:outline-offset-2 focus:outline-[#2D4739] disabled:cursor-not-allowed disabled:opacity-45"
          >
            {publishing ? "Publishing…" : "Publish listing"}
          </button>
          <p className="mt-3 text-center text-[11px] leading-4 text-[#8C8C7A]">
            Every completed sale from this listing becomes evidence in your Financial Passport.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="u-label flex items-baseline justify-between">
        <span>{label}</span>
        {hint && <span className="normal-case tracking-normal text-[#8C8C7A]">{hint}</span>}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
