"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useHarvestLink } from "@/app/providers/HarvestLinkProvider";
import { formatNaira } from "@/lib/demo-data";
import ConsumerNav from "@/Components/product/ConsumerNav";

const DELIVERY_FEE_NGN = 1_200;

/* ─────────────────────────────────────────────
 * Checkout — walkthrough step 6
 *
 * Payment is simulated. That's stated on the screen
 * rather than buried, because the demo shows a bank's
 * dashboard two steps later and the audience needs to
 * be certain which parts are real.
 * ───────────────────────────────────────────── */

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotalNgn, placeOrder } = useHarvestLink();
  const [fulfilment, setFulfilment] = useState<"delivery" | "pickup">("delivery");
  const [paying, setPaying] = useState(false);

  const deliveryNgn = fulfilment === "delivery" ? DELIVERY_FEE_NGN : 0;
  const totalNgn = cartSubtotalNgn + deliveryNgn;

  if (cart.length === 0 && !paying) {
    return (
      <main className="min-h-dvh bg-[#F5EFE6] text-[#1A1A1A]">
        <ConsumerNav />
        <div className="mx-auto max-w-md px-5 py-20 text-center">
          <h1 className="font-heading text-3xl">Nothing to check out.</h1>
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

  function handlePay() {
    setPaying(true);
    placeOrder(fulfilment, DELIVERY_FEE_NGN);
    router.push("/marketplace/payment-success");
  }

  return (
    <main className="min-h-dvh bg-[#F5EFE6] pb-40 text-[#1A1A1A]">
      <ConsumerNav />

      <div className="mx-auto max-w-3xl px-5">
        <Link
          href="/marketplace/cart"
          className="mt-5 inline-flex items-center gap-2 text-xs text-[#4A4A42] hover:text-[#1A1A1A]"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Back to cart
        </Link>

        <p className="u-label mt-5">Checkout</p>
        <h1 className="mt-1 font-heading text-[34px] font-medium leading-none">
          Confirm your order
        </h1>

        {/* ── Fulfilment ─────────────────────────── */}
        <section className="mt-7">
          <p className="u-label">Fulfilment</p>
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
                    : "border-[#D9D0C3] bg-white hover:bg-[#EDE4D8]"
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </section>

        {fulfilment === "delivery" && (
          <section className="panel mt-4 p-4">
            <p className="u-label">Delivery to</p>
            <p className="mt-1.5 text-sm">12 Ijede Road, Ikorodu, Lagos</p>
          </section>
        )}

        {/* ── Order summary ──────────────────────── */}
        <section className="panel mt-4 p-5">
          <p className="u-label">Order summary</p>
          <ul className="mt-3 space-y-2.5">
            {cart.map((line) => (
              <li key={line.listingId} className="flex justify-between gap-4 text-sm">
                <span className="text-[#4A4A42]">
                  {line.produce}
                  {line.variety && ` · ${line.variety}`} · {line.quantityKg} kg
                </span>
                <span className="shrink-0 font-medium">
                  {formatNaira(line.quantityKg * line.pricePerKgNgn)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-4 space-y-1.5 border-t border-[#EDE4D8] pt-3 text-sm">
            <div className="flex justify-between text-[#4A4A42]">
              <dt>Subtotal</dt>
              <dd>{formatNaira(cartSubtotalNgn)}</dd>
            </div>
            <div className="flex justify-between text-[#4A4A42]">
              <dt>{fulfilment === "delivery" ? "Delivery" : "Pickup"}</dt>
              <dd>{deliveryNgn === 0 ? "Free" : formatNaira(deliveryNgn)}</dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-[#D9D0C3] pt-2">
              <dt className="u-label">Total</dt>
              <dd className="font-heading text-[26px] leading-none">{formatNaira(totalNgn)}</dd>
            </div>
          </dl>
        </section>

        {/* ── Payment ────────────────────────────── */}
        <section className="panel mt-4 p-5">
          <div className="flex items-center justify-between">
            <p className="u-label">Payment method</p>
            <span className="rounded-sm border border-[#D9D0C3] px-2 py-1 text-[9px] font-medium tracking-[0.1em] text-[#8C8C7A]">
              DEMO / SIMULATED
            </span>
          </div>
          <p className="mt-2 text-sm">Bank transfer</p>
          <p className="mt-2 text-[11px] leading-4 text-[#8C8C7A]">
            No payment is processed and no money moves. The order is recorded so the walkthrough can
            show how a completed sale becomes evidence on the farmer&apos;s profile.
          </p>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-[#D9D0C3] bg-[#F5EFE6] p-4">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={handlePay}
            disabled={paying}
            className="flex min-h-[52px] w-full items-center justify-center rounded-sm bg-[#2D4739] text-[15px] font-semibold text-[#F5EFE6] transition-colors hover:bg-[#203429] focus:outline-2 focus:outline-offset-2 focus:outline-[#2D4739] disabled:opacity-60"
          >
            {paying ? "Confirming…" : `Pay ${formatNaira(totalNgn)}`}
          </button>
        </div>
      </div>
    </main>
  );
}
