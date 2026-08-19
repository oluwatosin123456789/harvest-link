"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useHarvestLink } from "@/app/providers/HarvestLinkProvider";
import { formatNaira } from "@/lib/demo-data";

/* ─────────────────────────────────────────────
 * Payment success — walkthrough step 7
 *
 * The pivot of the whole demo. Every other marketplace
 * confirms an order and stops. This one keeps going and
 * shows what the sale did on the other side of the
 * transaction: the farmer's record grew, and the score
 * a lender would read moved with it.
 *
 * Everything below the receipt is farmer-side. It's
 * labelled as such — the buyer is being shown the
 * consequence of their purchase, not their own data.
 * ───────────────────────────────────────────── */

export default function PaymentSuccessPage() {
  const { order, feapMovement, completedOrders, totalVolumeNgn } = useHarvestLink();

  if (!order) {
    return (
      <main className="grid min-h-dvh place-items-center bg-[#F5EFE6] px-5 text-center text-[#1A1A1A]">
        <div>
          <h1 className="font-heading text-3xl">No recent order.</h1>
          <p className="mt-3 text-sm text-[#4A4A42]">
            Place an order to see how it lands on the farmer&apos;s profile.
          </p>
          <Link
            href="/marketplace"
            className="mt-6 inline-flex min-h-12 items-center rounded-sm bg-[#2D4739] px-6 text-sm font-semibold text-[#F5EFE6]"
          >
            Browse produce
          </Link>
        </div>
      </main>
    );
  }

  const farmerRevenue = order.subtotalNgn;

  return (
    <main className="min-h-dvh bg-[#F5EFE6] pb-16 text-[#1A1A1A]">
      {/* ── Receipt ──────────────────────────────── */}
      <section className="bg-[#111410] px-6 pb-12 pt-14 text-[#F5EFE6]">
        <div className="mx-auto max-w-2xl">
          <div className="grid size-14 place-items-center rounded-full bg-[#2D4739]">
            <Check size={26} aria-hidden="true" />
          </div>
          <h1 className="mt-6 font-heading text-[40px] font-medium leading-[1.05] tracking-[-0.02em]">
            Order confirmed.
          </h1>
          <p className="mt-3 max-w-md text-sm leading-6 text-[#B9C9BC]">
            Payment of {formatNaira(order.totalNgn)} succeeded. The farmer has been notified and
            will begin preparing your order.
          </p>
          <p className="u-mono mt-5 text-[#8C8C7A]">
            {order.ref} · {order.fulfilment.toUpperCase()}
          </p>
        </div>
      </section>

      {/* ── The other side of the transaction ────── */}
      <section className="mx-auto max-w-2xl px-5">
        <div className="-mt-6 rounded-lg border border-[#D9D0C3] bg-white p-5 shadow-[0_8px_24px_rgba(17,20,16,0.08)]">
          <p className="u-label">What just happened on the farmer&apos;s side</p>

          <ol className="mt-4 space-y-4">
            <Ripple
              title="Transaction recorded"
              detail={`${formatNaira(farmerRevenue)} produce sale${
                order.lines[0] ? ` · Fresco estimate ${order.lines[0].freshnessScore} attached` : ""
              }`}
            />
            <Ripple
              title="Business activity updated"
              detail={`${completedOrders} completed orders · ${formatNaira(
                totalVolumeNgn,
                true,
              )} total volume`}
            />
            {feapMovement && (
              <Ripple
                title="FEAP recalculated"
                detail={`${feapMovement.from} → ${feapMovement.to} · ${feapMovement.reason}`}
                emphasis
              />
            )}
          </ol>
        </div>

        {/* ── Hand-off to the passport ───────────── */}
        <Link
          href="/dashboard/farmer/passport"
          className="mt-4 flex items-center justify-between gap-4 rounded-lg bg-[#2D4739] p-5 text-left text-[#F5EFE6] transition-colors hover:bg-[#203429] focus:outline-2 focus:outline-offset-2 focus:outline-[#2D4739]"
        >
          <div>
            <p className="u-label !text-[#B9C9BC]">Farmer view</p>
            <p className="mt-1 font-heading text-2xl leading-7">
              See the Financial Passport update
            </p>
          </div>
          <ArrowRight size={22} className="shrink-0 text-[#FFC107]" aria-hidden="true" />
        </Link>

        <div className="mt-4 flex gap-3">
          <Link
            href="/marketplace"
            className="flex min-h-12 flex-1 items-center justify-center rounded-sm border border-[#D9D0C3] bg-white text-sm font-medium hover:bg-[#EDE4D8]"
          >
            Keep shopping
          </Link>
        </div>

        <p className="mt-6 text-[11px] leading-4 text-[#8C8C7A]">
          Payment is simulated for this demo. The activity figures shown are seeded history plus
          this session&apos;s order.
        </p>
      </section>
    </main>
  );
}

function Ripple({
  title,
  detail,
  emphasis = false,
}: {
  title: string;
  detail: string;
  emphasis?: boolean;
}) {
  return (
    <li className="flex gap-3">
      <span
        className="mt-1.5 size-2 shrink-0 rounded-full"
        style={{ background: emphasis ? "#FFC107" : "#2D4739" }}
        aria-hidden="true"
      />
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-0.5 text-xs leading-5 text-[#4A4A42]">{detail}</p>
      </div>
    </li>
  );
}
