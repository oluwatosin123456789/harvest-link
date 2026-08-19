"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useHarvestLink } from "@/app/providers/HarvestLinkProvider";
import { formatNaira } from "@/lib/demo-data";
import FreshnessBadge from "@/Components/product/FreshnessBadge";
import ConsumerNav from "@/Components/product/ConsumerNav";

const DELIVERY_FEE_NGN = 1_200;

/* ─────────────────────────────────────────────
 * Cart
 *
 * Kept plain on purpose — it's a staging post, not a
 * destination. The one thing it does add is naming
 * which farm each line came from, since an order can
 * span several and each farmer is paid separately.
 * ───────────────────────────────────────────── */

export default function CartPage() {
  const { cart, cartSubtotalNgn, removeFromCart } = useHarvestLink();

  const farms = new Set(cart.map((l) => l.farmName));

  if (cart.length === 0) {
    return (
      <main className="min-h-dvh bg-[#F5EFE6] text-[#1A1A1A]">
        <ConsumerNav />
        <div className="mx-auto max-w-md px-5 py-20 text-center">
          <h1 className="font-heading text-3xl">Your cart is empty.</h1>
          <p className="mt-3 text-sm text-[#4A4A42]">
            Produce you add from the marketplace will collect here.
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

  return (
    <main className="min-h-dvh bg-[#F5EFE6] pb-40 text-[#1A1A1A]">
      <ConsumerNav />

      <div className="mx-auto max-w-3xl px-5">
        <h1 className="mt-7 font-heading text-[34px] font-medium leading-none">Your cart</h1>

        <ul className="mt-6 space-y-3">
          {cart.map((line) => (
            <li key={line.listingId} className="panel flex items-start justify-between gap-4 p-4">
              <div>
                <h2 className="text-base font-medium">
                  {line.produce}
                  {line.variety && <span className="text-[#8C8C7A]"> · {line.variety}</span>}
                </h2>
                <p className="mt-0.5 text-xs text-[#8C8C7A]">{line.farmName}</p>
                <div className="mt-2">
                  <FreshnessBadge score={line.freshnessScore} showLabel={false} />
                </div>
                <p className="mt-2 text-sm text-[#4A4A42]">
                  {line.quantityKg} kg × {formatNaira(line.pricePerKgNgn)}
                </p>
              </div>

              <div className="flex flex-col items-end gap-3">
                <p className="font-heading text-xl leading-none">
                  {formatNaira(line.quantityKg * line.pricePerKgNgn)}
                </p>
                <button
                  onClick={() => removeFromCart(line.listingId)}
                  aria-label={`Remove ${line.produce} from cart`}
                  className="grid size-10 place-items-center rounded-sm border border-[#D9D0C3] text-[#B3541E] transition-colors hover:bg-[#EDE4D8]"
                >
                  <Trash2 size={16} aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {farms.size > 1 && (
          <p className="mt-4 rounded-sm border-l-[3px] border-[#FFC107] bg-[#EDE4D8] p-3 text-xs leading-5 text-[#4A4A42]">
            This order covers {farms.size} farms. Each farm prepares and is paid for its own items,
            so they may arrive separately.
          </p>
        )}
      </div>

      {/* ── Totals ───────────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 border-t border-[#D9D0C3] bg-[#F5EFE6] p-4">
        <div className="mx-auto max-w-3xl">
          <dl className="space-y-1.5 text-sm">
            <div className="flex justify-between text-[#4A4A42]">
              <dt>Subtotal</dt>
              <dd>{formatNaira(cartSubtotalNgn)}</dd>
            </div>
            <div className="flex justify-between text-[#4A4A42]">
              <dt>Delivery</dt>
              <dd>{formatNaira(DELIVERY_FEE_NGN)}</dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-[#D9D0C3] pt-2">
              <dt className="u-label">Total</dt>
              <dd className="font-heading text-[26px] leading-none">
                {formatNaira(cartSubtotalNgn + DELIVERY_FEE_NGN)}
              </dd>
            </div>
          </dl>

          <Link
            href="/marketplace/checkout"
            className="mt-3 flex min-h-[52px] w-full items-center justify-center rounded-sm bg-[#2D4739] text-[15px] font-semibold text-[#F5EFE6] transition-colors hover:bg-[#203429] focus:outline-2 focus:outline-offset-2 focus:outline-[#2D4739]"
          >
            Proceed to checkout
          </Link>
        </div>
      </div>
    </main>
  );
}
