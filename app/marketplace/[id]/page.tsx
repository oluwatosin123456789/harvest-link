"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Star } from "lucide-react";
import { useHarvestLink } from "@/app/providers/HarvestLinkProvider";
import { ACTIVITY, FARMER, formatNaira, freshnessLabel } from "@/lib/demo-data";
import FreshnessBadge from "@/Components/product/FreshnessBadge";
import ConsumerNav from "@/Components/product/ConsumerNav";

/* ─────────────────────────────────────────────
 * Produce detail — walkthrough step 5
 *
 * Where the buyer decides. Two things earn the sale:
 * the Fresco estimate on this specific batch, and the
 * farm's own track record. Both are shown as observed
 * figures, never as a rating we invented.
 * ───────────────────────────────────────────── */

export default function ProduceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { listings, addToCart } = useHarvestLink();
  const [quantityKg, setQuantityKg] = useState(5);

  const listing = listings.find((l) => l.id === id);

  if (!listing) {
    return (
      <main className="min-h-dvh bg-[#F5EFE6] text-[#1A1A1A]">
        <ConsumerNav />
        <div className="mx-auto max-w-md px-5 py-20 text-center">
          <h1 className="font-heading text-3xl">This listing has gone.</h1>
          <p className="mt-3 text-sm text-[#4A4A42]">
            It may have sold out, or the demo session was reset.
          </p>
          <Link
            href="/marketplace"
            className="mt-6 inline-flex min-h-12 items-center rounded-sm bg-[#2D4739] px-6 text-sm font-semibold text-[#F5EFE6]"
          >
            Back to marketplace
          </Link>
        </div>
      </main>
    );
  }

  const lineTotal = quantityKg * listing.pricePerKgNgn;

  function handleAddToCart() {
    if (!listing) return;
    addToCart({
      listingId: listing.id,
      produce: listing.produce,
      variety: listing.variety,
      farmName: listing.farmName,
      quantityKg,
      pricePerKgNgn: listing.pricePerKgNgn,
      freshnessScore: listing.freshnessScore,
    });
    router.push("/marketplace/cart");
  }

  return (
    <main className="min-h-dvh bg-[#F5EFE6] pb-32 text-[#1A1A1A]">
      <ConsumerNav />

      <div className="mx-auto max-w-3xl px-5">
        <Link
          href="/marketplace"
          className="mt-5 inline-flex items-center gap-2 text-xs text-[#4A4A42] hover:text-[#1A1A1A]"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Back to marketplace
        </Link>

        <div
          className="mt-4 grid h-56 place-items-center rounded-lg"
          style={{
            background:
              "repeating-linear-gradient(135deg,rgba(179,84,30,0.16) 0 14px,rgba(45,71,57,0.11) 14px 28px)",
          }}
        >
          <span className="u-mono text-[#4A4A42]">
            {listing.produce.toUpperCase()} · FARMER UPLOAD
          </span>
        </div>

        {/* ── Identity and price ─────────────────── */}
        <section className="mt-6 flex items-start justify-between gap-6">
          <div>
            <h1 className="font-heading text-[36px] font-medium leading-[1.05] tracking-[-0.02em]">
              {listing.produce}
            </h1>
            <p className="mt-1 text-sm text-[#4A4A42]">
              {listing.variety ? `${listing.variety} variety · ` : ""}
              {listing.quantityKg} kg available
            </p>
          </div>
          <div className="text-right">
            <p className="font-heading text-[32px] leading-none">
              {formatNaira(listing.pricePerKgNgn)}
            </p>
            <p className="mt-1 text-[11px] text-[#8C8C7A]">per kg</p>
          </div>
        </section>

        {/* ── The Fresco assessment ──────────────── */}
        <section className="panel mt-6 p-5">
          <div className="flex items-center justify-between">
            <p className="u-label">AI freshness estimate</p>
            <span className="u-mono text-[#8C8C7A]">FRESCO</span>
          </div>

          <div className="mt-4 flex items-center gap-5">
            <FreshnessBadge score={listing.freshnessScore} size="lg" />
            <div className="border-l border-[#D9D0C3] pl-5">
              <p className="text-sm text-[#4A4A42]">
                {listing.shelfLifeDays} days estimated shelf life
              </p>
              <p className="mt-1 text-xs text-[#8C8C7A]">
                {listing.scannedHoursAgo === 0
                  ? "Scanned just now"
                  : `Scanned ${listing.scannedHoursAgo}h ago`}
              </p>
            </div>
          </div>

          <p className="mt-4 border-t border-[#EDE4D8] pt-3 text-[11px] leading-4 text-[#8C8C7A]">
            {freshnessLabel(listing.freshnessScore)} at the time of scanning. Fresco gives an
            AI-generated estimate, not a food safety certification.
          </p>
        </section>

        {/* ── Who grew it ────────────────────────── */}
        <section className="panel mt-4 p-5">
          <p className="u-label">The farm</p>
          <h2 className="mt-2 font-heading text-2xl font-medium">{listing.farmName}</h2>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-[#8C8C7A]">
            <MapPin size={13} aria-hidden="true" />
            {FARMER.lga}, {FARMER.state} · {listing.distanceKm} km away
          </p>
          <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#4A4A42]">
            <span>{ACTIVITY.completedOrders} completed orders</span>
            <span aria-hidden="true" className="text-[#D9D0C3]">·</span>
            <span>{ACTIVITY.fulfilmentRatePct}% fulfilment</span>
            <span aria-hidden="true" className="text-[#D9D0C3]">·</span>
            <span className="inline-flex items-center gap-1">
              <Star size={12} className="fill-[#FFC107] text-[#FFC107]" aria-hidden="true" />
              {FARMER.rating}
            </span>
          </p>
        </section>

        {/* ── Quantity ───────────────────────────── */}
        <section className="mt-6">
          <label htmlFor="qty" className="u-label">
            Quantity (kg)
          </label>
          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuantityKg((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="grid size-12 place-items-center rounded-sm border border-[#D9D0C3] bg-white text-lg hover:bg-[#EDE4D8]"
            >
              −
            </button>
            <input
              id="qty"
              type="number"
              inputMode="numeric"
              min={1}
              max={listing.quantityKg}
              value={quantityKg}
              onChange={(e) =>
                setQuantityKg(Math.min(listing.quantityKg, Math.max(1, Number(e.target.value) || 1)))
              }
              className="listing-input max-w-24 text-center"
            />
            <button
              type="button"
              onClick={() => setQuantityKg((q) => Math.min(listing.quantityKg, q + 1))}
              aria-label="Increase quantity"
              className="grid size-12 place-items-center rounded-sm border border-[#D9D0C3] bg-white text-lg hover:bg-[#EDE4D8]"
            >
              +
            </button>
          </div>
        </section>
      </div>

      {/* ── Buy ──────────────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 border-t border-[#D9D0C3] bg-[#F5EFE6] p-4">
        <div className="mx-auto flex max-w-3xl items-center gap-4">
          <div className="shrink-0">
            <p className="u-label">Total</p>
            <p className="font-heading text-[26px] leading-none">{formatNaira(lineTotal)}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex min-h-[52px] flex-1 items-center justify-center rounded-sm bg-[#2D4739] text-[15px] font-semibold text-[#F5EFE6] transition-colors hover:bg-[#203429] focus:outline-2 focus:outline-offset-2 focus:outline-[#2D4739]"
          >
            Add to cart
          </button>
        </div>
      </div>
    </main>
  );
}
