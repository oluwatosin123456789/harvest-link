"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Lock, X } from "lucide-react";
import { useHarvestLink } from "@/app/providers/HarvestLinkProvider";
import { ACTIVITY, FARMER, formatNaira } from "@/lib/demo-data";

/* ─────────────────────────────────────────────
 * Consent — walkthrough step 9
 *
 * The farmer's data does not reach a bank without
 * this screen. Two rules shape it:
 *
 *   1. Everything shared is itemised before the farmer
 *      agrees — no "and related information".
 *   2. Declining is a real option, given equal weight,
 *      not a greyed-out afterthought.
 *
 * Sharing is also revocable from here once granted.
 * ───────────────────────────────────────────── */

const SHARED = [
  { label: "Business activity summary", value: `${ACTIVITY.completedOrders} completed orders` },
  { label: "Revenue observed on Harvest-Link", value: formatNaira(ACTIVITY.totalVolumeNgn, true) },
  { label: "Order fulfilment record", value: `${ACTIVITY.fulfilmentRatePct}% fulfilment rate` },
  { label: "FEAP score and band", value: "Established" },
  { label: "Months active", value: `${FARMER.activeMonths} months` },
];

const NOT_SHARED = [
  "Your bank balance or existing accounts",
  "Individual customer names or contact details",
  "Your location beyond local government area",
  "Photographs from your produce scans",
];

export default function ConsentPage() {
  const router = useRouter();
  const { consentGranted, consentAt, feapScore, grantConsent, revokeConsent } = useHarvestLink();

  if (consentGranted) {
    return (
      <div className="mx-auto max-w-md px-5 py-10 text-[#1A1A1A] md:max-w-2xl">
        <div className="rounded-lg border border-[#2D4739]/30 bg-[#2D4739]/5 p-5">
          <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.06em] text-[#2D4739]">
            <Check size={14} aria-hidden="true" />
            Sharing active
          </p>
          <h1 className="mt-2 font-heading text-[30px] font-medium leading-9">
            Wema Bank can see your passport.
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#4A4A42]">
            Granted{" "}
            {consentAt
              ? new Date(consentAt).toLocaleDateString("en-NG", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "today"}
            . You can withdraw this at any time, and the bank loses access immediately.
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <Link
            href="/dashboard/admin"
            className="flex min-h-[52px] items-center justify-center rounded-sm bg-[#2D4739] text-[15px] font-semibold text-[#F5EFE6] hover:bg-[#203429]"
          >
            View what the bank sees
          </Link>
          <button
            onClick={revokeConsent}
            className="flex min-h-[52px] items-center justify-center rounded-sm border border-[#B3541E] text-[15px] font-semibold text-[#B3541E] hover:bg-[#B3541E]/8"
          >
            Withdraw sharing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-5 py-8 pb-32 text-[#1A1A1A] md:max-w-2xl">
      <p className="u-label">Consent</p>
      <h1 className="mt-1 font-heading text-[34px] font-medium leading-[1.08] tracking-[-0.02em]">
        Share your passport with Wema Bank?
      </h1>
      <p className="mt-3 text-sm leading-6 text-[#4A4A42]">
        Wema Bank can review your Harvest-Link business record as part of their own assessment. You
        decide whether they see it, and you can change your mind later.
      </p>

      {/* ── What goes ──────────────────────────── */}
      <section className="panel mt-6 p-5">
        <p className="u-label">Exactly what is shared</p>
        <ul className="mt-3 space-y-2.5">
          {SHARED.map((item) => (
            <li key={item.label} className="flex items-start justify-between gap-4 text-sm">
              <span className="flex items-start gap-2 text-[#4A4A42]">
                <Check size={15} className="mt-0.5 shrink-0 text-[#2D4739]" aria-hidden="true" />
                {item.label}
              </span>
              <span className="shrink-0 font-medium">{item.value}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── What stays ─────────────────────────── */}
      <section className="panel-recessed mt-4 p-5">
        <p className="u-label flex items-center gap-1.5">
          <Lock size={12} aria-hidden="true" />
          What stays private
        </p>
        <ul className="mt-3 space-y-2">
          {NOT_SHARED.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[#4A4A42]">
              <X size={15} className="mt-0.5 shrink-0 text-[#8C8C7A]" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-5 text-[11px] leading-4 text-[#8C8C7A]">
        Sharing your passport is not a loan application and does not guarantee any offer. Wema Bank
        conducts its own independent review. Your FEAP score of {feapScore} is a summary of activity
        recorded on Harvest-Link, not a credit rating.
      </p>

      {/* ── Decide ─────────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 border-t border-[#D9D0C3] bg-[#F5EFE6] p-4 md:static md:mt-6 md:border-0 md:bg-transparent md:p-0">
        <div className="mx-auto flex max-w-md flex-col gap-3 md:max-w-2xl">
          <button
            onClick={() => {
              grantConsent();
              router.push("/dashboard/admin");
            }}
            className="flex min-h-[52px] items-center justify-center rounded-sm bg-[#2D4739] text-[15px] font-semibold text-[#F5EFE6] transition-colors hover:bg-[#203429] focus:outline-2 focus:outline-offset-2 focus:outline-[#2D4739]"
          >
            Share with Wema Bank
          </button>
          <Link
            href="/dashboard/farmer/passport"
            className="flex min-h-[52px] items-center justify-center rounded-sm border border-[#1A1A1A] text-[15px] font-semibold transition-colors hover:bg-[#EDE4D8]"
          >
            Not now
          </Link>
        </div>
      </div>
    </div>
  );
}
