"use client";

import Link from "next/link";
import { MapPin, Search } from "lucide-react";
import { useHarvestLink } from "@/app/providers/HarvestLinkProvider";
import { FARMER, formatNaira } from "@/lib/demo-data";
import FreshnessBadge from "@/Components/product/FreshnessBadge";
import ConsumerNav from "@/Components/product/ConsumerNav";

/* ─────────────────────────────────────────────
 * Marketplace — walkthrough step 4
 *
 * The buyer's first screen, and the moment the two
 * halves of the product meet: whatever the farmer
 * published a step ago is sitting at the top of this
 * list, carrying its Fresco estimate with it.
 * ───────────────────────────────────────────── */

export default function MarketplacePage() {
  const { listings } = useHarvestLink();
  const justListed = listings.filter((l) => l.justListed);
  const rest = listings.filter((l) => !l.justListed);

  return (
    <main className="min-h-dvh bg-[#F5EFE6] pb-16 text-[#1A1A1A]">
      <ConsumerNav />

      <div className="mx-auto max-w-5xl px-5">
        <section className="pt-7">
          <p className="u-label text-[#B3541E]">
            {FARMER.lga}, {FARMER.state}
          </p>
          <h1 className="mt-2 max-w-xl font-heading text-[38px] font-medium leading-[1.05] tracking-[-0.02em]">
            Produce with a story you can see.
          </h1>

          <button
            type="button"
            className="mt-6 flex min-h-12 w-full max-w-lg items-center gap-3 rounded-sm border border-[#D9D0C3] bg-white px-4 text-sm text-[#8C8C7A] transition-colors hover:bg-[#EDE4D8]"
          >
            <Search size={18} aria-hidden="true" />
            Search tomatoes, peppers, farms…
          </button>

          <p className="mt-3 flex items-center gap-1.5 text-xs text-[#4A4A42]">
            <MapPin size={14} aria-hidden="true" />
            Showing farms near{" "}
            <span className="font-medium">
              {FARMER.lga}, {FARMER.state}
            </span>
          </p>
        </section>

        {/* ── The listing that just came off the scanner ── */}
        {justListed.length > 0 && (
          <section className="mt-9">
            <div className="flex items-baseline justify-between">
              <h2 className="font-heading text-[28px] font-medium leading-8">Fresh today</h2>
              <span className="u-mono text-[#8C8C7A]">SCANNED IN LAST 24H</span>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {justListed.map((listing) => (
                <ListingCard key={listing.id} listing={listing} highlight />
              ))}
            </div>
          </section>
        )}

        {/* ── Everything else nearby ─────────────── */}
        <section className="mt-10">
          <div className="flex items-baseline justify-between">
            <h2 className="font-heading text-[28px] font-medium leading-8">Near you</h2>
            <span className="u-mono text-[#8C8C7A]">WITHIN 12KM</span>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

        <p className="mt-10 text-[11px] leading-4 text-[#8C8C7A]">
          Freshness figures are AI estimates produced by Fresco at the time of scanning. They are
          not a food safety certification.
        </p>
      </div>
    </main>
  );
}

function ListingCard({
  listing,
  highlight = false,
}: {
  listing: ReturnType<typeof useHarvestLink>["listings"][number];
  highlight?: boolean;
}) {
  return (
    <Link
      href={`/marketplace/${listing.id}`}
      className={`group flex flex-col overflow-hidden rounded-lg border bg-white transition-shadow hover:shadow-[0_8px_24px_rgba(17,20,16,0.08)] focus:outline-2 focus:outline-offset-2 focus:outline-[#2D4739] ${
        highlight ? "border-[#2D4739]" : "border-[#D9D0C3]"
      }`}
    >
      {/* Produce imagery isn't shot yet — a tinted plate keeps the
       * card's proportions honest without faking a photograph. */}
      <div
        className="relative grid h-40 place-items-center"
        style={{
          background:
            "repeating-linear-gradient(135deg,rgba(179,84,30,0.14) 0 12px,rgba(45,71,57,0.10) 12px 24px)",
        }}
      >
        <span className="u-mono text-[#4A4A42]">{listing.produce.toUpperCase()}</span>
        {highlight && (
          <span className="absolute left-3 top-3 rounded-sm bg-[#2D4739] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#F5EFE6]">
            Just listed
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading text-xl font-medium leading-6">
          {listing.produce}
          {listing.variety && <span className="text-[#8C8C7A]"> · {listing.variety}</span>}
        </h3>
        <p className="mt-1 text-xs text-[#8C8C7A]">
          {listing.farmName} · {listing.distanceKm} km away
        </p>

        <div className="mt-3">
          <FreshnessBadge score={listing.freshnessScore} />
        </div>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <p className="font-heading text-2xl leading-none">
              {formatNaira(listing.pricePerKgNgn)}
            </p>
            <p className="mt-1 text-[11px] text-[#8C8C7A]">per kg</p>
          </div>
          <span className="text-xs text-[#B3541E] underline underline-offset-4 group-hover:text-[#2D4739]">
            View
          </span>
        </div>
      </div>
    </Link>
  );
}
