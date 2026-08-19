"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Check, ChevronDown, MapPin, ShieldCheck } from "lucide-react";
import { useState } from "react";

type FarmerProfile = {
  name: string; initials: string; farm: string; id: string; location: string; size: string; crops: string; since: string;
  score: number; band: string; revenue: string; months: string; transactions: string; averageOrder: string;
  fulfilment: string; fulfilmentDetail: string; repeat: string; repeatDetail: string;
};

const FARMERS: Record<string, FarmerProfile> = {
  "1": { name: "Amaka Okafor", initials: "AO", farm: "Green Acres Farm", id: "HL-FRM-00417", location: "Ikorodu, Lagos", size: "2.4 hectares", crops: "Tomatoes, pepper, cucumber", since: "Dec 2025", score: 79, band: "Established", revenue: "₦1.85M", months: "8 active months", transactions: "127", averageOrder: "₦14,600 average order", fulfilment: "94%", fulfilmentDetail: "127 of 135 accepted", repeat: "72%", repeatDetail: "41 of 57 buyers returned" },
  "2": { name: "Babatunde Aliyu", initials: "BA", farm: "Sunshine Farms", id: "HL-FRM-00418", location: "Epe, Lagos", size: "3.1 hectares", crops: "Maize, cassava, vegetables", since: "Aug 2025", score: 82, band: "Strong", revenue: "₦2.12M", months: "12 active months", transactions: "164", averageOrder: "₦12,930 average order", fulfilment: "96%", fulfilmentDetail: "164 of 171 accepted", repeat: "68%", repeatDetail: "47 of 69 buyers returned" },
};

const fallbackFarmer: FarmerProfile = { name: "Farmer profile", initials: "FP", farm: "Harvest-Link Farm", id: "HL-FRM-00420", location: "Lagos, Nigeria", size: "2.0 hectares", crops: "Seasonal produce", since: "Jan 2026", score: 68, band: "Developing", revenue: "₦940K", months: "6 active months", transactions: "71", averageOrder: "₦13,240 average order", fulfilment: "91%", fulfilmentDetail: "71 of 78 accepted", repeat: "54%", repeatDetail: "23 of 43 buyers returned" };

const scoreTracks = [
  { name: "Transaction consistency", score: 81, evidence: "31 of 34 weeks with at least one completed order" },
  { name: "Sales performance", score: 76, evidence: "₦1.85M total volume · ₦14,600 average order" },
  { name: "Fulfilment", score: 94, evidence: "127 completed of 135 accepted orders" },
  { name: "Customer trust", score: 72, evidence: "41 of 57 buyers ordered again · 4.8 average rating" },
  { name: "Produce quality", score: 82, evidence: "Average freshness estimate 82 across 64 Fresco scans" },
];

const freshnessHistory = [60, 72, 66, 84, 78, 88, 82, 90];

export default function FarmerDetailAdminPage() {
  const params = useParams<{ id: string }>();
  const farmer = FARMERS[params.id] ?? fallbackFarmer;
  const [reviewStatus, setReviewStatus] = useState("Pending review");
  const [isMarked, setIsMarked] = useState(false);

  return (
    <div className="animate-fade-up pb-10">
      <div className="flex flex-col justify-between gap-5 border-b border-[#D9D0C3] pb-5 sm:flex-row sm:items-end">
        <div>
          <Link href="/dashboard/admin" className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.06em] text-[#6B6560] transition-colors hover:text-[#1A1A1A]"><ArrowLeft size={14} /> PORTFOLIO / FARMERS</Link>
          <h1 className="mt-3 font-heading text-4xl font-medium tracking-[-0.025em] text-[#1A1A1A] sm:text-5xl">{farmer.name}</h1>
          <p className="mt-1 font-mono text-[11px] tracking-[0.04em] text-[#6B6560]">{farmer.id} · {farmer.location.toUpperCase()}</p>
        </div>
        <div className="flex items-end gap-5 sm:gap-7"><div className="text-right"><p className="text-[11px] font-medium tracking-[0.08em] text-[#6B6560]">FEAP</p><p className="font-heading text-5xl font-medium leading-none">{farmer.score}</p></div><span className="mb-1 border border-[#2D4739] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.06em] text-[#2D4739]">{farmer.band}</span></div>
      </div>

      <section className="mt-5 grid overflow-hidden border border-[#D9D0C3] bg-[#D9D0C3] sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Revenue observed" value={farmer.revenue} detail={farmer.months} /><Metric label="Transactions" value={farmer.transactions} detail={farmer.averageOrder} /><Metric label="Fulfilment" value={farmer.fulfilment} detail={farmer.fulfilmentDetail} /><Metric label="Repeat customers" value={farmer.repeat} detail={farmer.repeatDetail} />
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-3">
        <InfoCard title="Farm"><div className="space-y-2.5 text-[13px] leading-5"><InfoRow label="Farm name" value={farmer.farm} /><InfoRow label="Location" value={farmer.location} /><InfoRow label="Size" value={farmer.size} /><InfoRow label="Crops" value={farmer.crops} alignRight /><InfoRow label="On platform since" value={farmer.since} /></div></InfoCard>
        <InfoCard title="Produce quality · Fresco"><div className="mt-1 flex items-end gap-2"><p className="font-heading text-5xl font-medium leading-none">82</p><p className="pb-1 text-xs text-[#6B6560]">average freshness estimate</p></div><p className="mt-3 text-[13px] leading-5 text-[#4A4A42]">Across 64 Fresco scans over 8 months. Freshness figures are AI estimates, not laboratory verification.</p><div aria-label="Freshness score history" className="mt-4 flex h-11 items-end gap-1">{freshnessHistory.map((height, index) => <div key={index} className="flex-1 bg-[#2A6B45]" style={{ height: `${height}%`, opacity: 0.7 + index * 0.035 }} />)}</div></InfoCard>
        <InfoCard title="Consent"><div className="space-y-2.5 text-[13px] leading-5"><InfoRow label="Status" value="Active" valueClass="font-medium text-[#2A6B45]" /><InfoRow label="Granted" value="18 Aug 2026, 09:22" /><InfoRow label="Expires" value="18 Feb 2027" /><InfoRow label="Scope" value="Full activity profile" alignRight /></div><div className="mt-4 border-t border-[#EDE4D8] pt-3 text-xs leading-[18px] text-[#6B6560]">Farmer-initiated and revocable at any time.</div></InfoCard>
      </section>

      <section className="mt-5 border border-[#D9D0C3] bg-white p-5 sm:p-6"><p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#6B6560]">FEAP components and supporting evidence</p><div className="mt-4 grid gap-px border border-[#EDE4D8] bg-[#EDE4D8] sm:grid-cols-2 xl:grid-cols-5">{scoreTracks.map((track) => <div key={track.name} className="bg-white p-4"><p className="min-h-8 text-xs leading-4 text-[#6B6560]">{track.name}</p><p className="mt-1 font-heading text-4xl font-medium leading-none">{track.score}</p><div className="mt-3 h-1 bg-[#EDE4D8]"><div className="h-full bg-[#2D4739]" style={{ width: `${track.score}%` }} /></div><p className="mt-3 text-[11px] leading-4 text-[#4A4A42]">{track.evidence}</p></div>)}</div></section>

      <section className="mt-5 flex flex-col gap-5 bg-[#0B1C13] p-5 text-[#F5EFE6] sm:p-6 lg:flex-row lg:items-center lg:justify-between"><div className="max-w-3xl"><div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.08em] text-[#B9C9BC]"><ShieldCheck size={15} /> Decision-support profile</div><p className="mt-2 text-sm leading-5 text-[#B9C9BC]">This profile reflects observed agricultural business activity on Harvest-Link. Wema Bank performs independent underwriting and makes all financial decisions.</p></div><div className="flex flex-wrap items-center gap-3"><label className="relative"><span className="sr-only">Review status</span><select value={reviewStatus} onChange={(event) => setReviewStatus(event.target.value)} className="appearance-none border border-[#718278] bg-transparent py-2.5 pl-3 pr-9 text-sm text-[#F5EFE6] outline-none"><option className="text-[#1A1A1A]">Pending review</option><option className="text-[#1A1A1A]">Under review</option><option className="text-[#1A1A1A]">Approved for contact</option><option className="text-[#1A1A1A]">Not eligible</option></select><ChevronDown className="pointer-events-none absolute right-3 top-3" size={16} /></label><button onClick={() => setIsMarked(true)} className="inline-flex min-h-11 items-center gap-2 bg-[#F5EFE6] px-4 text-sm font-medium text-[#1A1A1A] transition-colors hover:bg-white">{isMarked ? <Check size={16} /> : <MapPin size={16} />}{isMarked ? "Marked for review" : "Begin independent review"}</button></div></section>
    </div>
  );
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) { return <div className="bg-white p-4 sm:p-5"><p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#6B6560]">{label}</p><p className="mt-1 font-heading text-4xl font-medium leading-none">{value}</p><p className="mt-1.5 text-xs text-[#6B6560]">{detail}</p></div>; }
function InfoCard({ title, children }: { title: string; children: React.ReactNode }) { return <article className="border border-[#D9D0C3] bg-white p-5"><h2 className="border-b border-[#EDE4D8] pb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-[#6B6560]">{title}</h2><div className="mt-3">{children}</div></article>; }
function InfoRow({ label, value, alignRight = false, valueClass = "" }: { label: string; value: string; alignRight?: boolean; valueClass?: string }) { return <div className="flex justify-between gap-4"><span className="shrink-0 text-[#6B6560]">{label}</span><span className={`${alignRight ? "text-right" : ""} ${valueClass}`}>{value}</span></div>; }
