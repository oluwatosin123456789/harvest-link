"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useHarvestLink } from "@/app/providers/HarvestLinkProvider";

/* ─────────────────────────────────────────────
 * Consumer header
 *
 * Deliberately thin. The buyer side of the demo is
 * a straight line — browse, open, buy — so the chrome
 * stays out of the way and only surfaces the one
 * piece of state that matters: what's in the bag.
 * ───────────────────────────────────────────── */

export default function ConsumerNav() {
  const { cart } = useHarvestLink();
  const pathname = usePathname();
  const itemCount = cart.length;

  return (
    <header className="sticky top-0 z-40 border-b border-[#D9D0C3] bg-[#F5EFE6]/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.08em]">
          Harvest-Link
        </Link>

        <Link
          href="/marketplace/cart"
          aria-label={itemCount ? `Shopping bag, ${itemCount} items` : "Shopping bag, empty"}
          aria-current={pathname === "/marketplace/cart" ? "page" : undefined}
          className="relative grid size-11 place-items-center rounded-md border border-[#D9D0C3] bg-white transition-colors hover:bg-[#EDE4D8] focus:outline-2 focus:outline-offset-2 focus:outline-[#2D4739]"
        >
          <ShoppingBag size={19} aria-hidden="true" />
          {itemCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-[#B3541E] text-[10px] font-semibold text-[#F5EFE6]">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
