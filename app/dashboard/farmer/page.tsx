import Link from "next/link";
import { Bell, ClipboardList, Plus, ScanLine, Sprout } from "lucide-react";

const actions = [
  { label: "Add listing", icon: Plus, href: "/dashboard/farmer/listings" },
  { label: "Scan produce", icon: ScanLine, href: "/dashboard/farmer/scan" },
  { label: "Orders", icon: ClipboardList, href: "/dashboard/farmer/listings" },
  { label: "Passport", icon: Sprout, href: "/dashboard/farmer/passport" },
];

export default function FarmerDashboard() {
  return (
    <div className="mx-auto max-w-md overflow-hidden bg-[#F5EFE6] pb-10 text-[#1A1A1A] md:max-w-6xl md:rounded-none">
      <section className="bg-[#111410] px-6 pb-9 pt-8 text-[#F5EFE6] md:px-10">
        <div className="flex items-start justify-between"><div><p className="text-[11px] font-medium tracking-[0.08em] text-[#F5EFE6]/55">TUESDAY, 18 AUGUST</p><h1 className="mt-2 text-xl font-medium">Good morning, Amaka.</h1></div><button aria-label="Open notifications" className="grid size-11 place-items-center rounded-md bg-[#F5EFE6]/10 transition-transform active:scale-95"><Bell size={21} /></button></div>
        <p className="mt-5 flex items-center gap-2 text-[11px] font-medium tracking-[0.07em] text-[#F5EFE6]/70"><span className="size-2 rounded-full bg-[#4A8C3F]" /> ESTABLISHED PROFILE</p>
        <div className="mt-7 grid grid-cols-3 divide-x divide-[#F5EFE6]/15">{[["₦1.84M", "Total volume"], ["126", "Orders"], ["94%", "Fulfillment"]].map(([value, label]) => <div key={label} className="px-3 first:pl-0"><p className="font-heading text-[30px] leading-none">{value}</p><p className="mt-2 text-[10px] uppercase tracking-[0.05em] text-[#F5EFE6]/50">{label}</p></div>)}</div>
        <div className="mt-7 flex items-center gap-4"><div className="grid size-[74px] place-items-center rounded-full border-4 border-[#2D4739] outline outline-1 outline-offset-4 outline-[#F5EFE6]/15"><span className="font-heading text-[28px]">78</span></div><div><p className="text-[10px] font-medium tracking-[0.08em] text-[#F5EFE6]/50">FEAP SCORE</p><p className="mt-1 font-heading text-xl">Your record is growing.</p><Link href="/dashboard/farmer/passport" className="mt-1 inline-block text-xs text-[#FFC107] underline underline-offset-4">View financial passport</Link></div></div>
      </section>
      <nav aria-label="Quick actions" className="grid grid-cols-4 border-b border-[#D9D0C3] bg-[#F5EFE6] px-3 py-4">{actions.map(({ label, icon: Icon, href }) => <Link key={label} href={href} className="grid min-h-16 place-items-center gap-1 text-center text-[10px] leading-3 text-[#4A4A42] focus:outline-2 focus:outline-[#2D4739]"><span className="grid size-11 place-items-center rounded-md bg-[#EDE4D8] text-[#2D4739]"><Icon size={22} /></span>{label}</Link>)}</nav>
      <section className="space-y-4 px-5 pt-6 md:px-10"><div className="flex items-end justify-between"><div><p className="text-[11px] font-medium tracking-[0.08em] text-[#8C8C7A]">TODAY&apos;S ACTIVITY</p><h2 className="mt-1 font-heading text-[28px] font-medium">Keep the record moving.</h2></div><Link href="/dashboard/farmer/listings" className="text-xs font-medium text-[#B3541E] underline underline-offset-4">All activity</Link></div>
        <article className="border border-[#D9D0C3] bg-white p-4"><div className="flex items-center justify-between"><div><p className="text-[11px] font-medium tracking-[0.07em] text-[#8C8C7A]">NEW ORDER</p><h3 className="mt-1 text-base font-medium">Tomatoes · 15kg crate</h3><p className="mt-1 text-sm text-[#4A4A42]">Mrs. Kemi · Ikorodu</p></div><p className="font-heading text-2xl">₦14,600</p></div><div className="mt-4 flex items-center justify-between border-t border-[#EDE4D8] pt-3"><span className="text-xs text-[#4A8C3F]">Payment confirmed</span><button className="rounded-sm bg-[#2D4739] px-4 py-2 text-xs font-semibold text-[#F5EFE6]">Accept order</button></div></article>
        <article className="border-l-[3px] border-[#FFC107] bg-[#EDE4D8] p-4"><p className="text-sm font-medium">Your farm activity is doing real work.</p><p className="mt-1 text-xs leading-5 text-[#4A4A42]">Complete this order to add verified fulfilment evidence to your Financial Passport.</p></article>
      </section>
    </div>
  );
}
