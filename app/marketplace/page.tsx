import Image from "next/image";
import Link from "next/link";
import { MapPin, Search, ShoppingBag, Star } from "lucide-react";

export default function Marketplace() {
  return (
    <main className="min-h-dvh bg-[#F5EFE6] pb-12 text-[#1A1A1A]">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5"><Link href="/" className="text-sm font-semibold uppercase tracking-[0.08em]">Harvest-Link</Link><button aria-label="Shopping bag" className="grid size-11 place-items-center rounded-md border border-[#D9D0C3]"><ShoppingBag size={20} /></button></header>
      <div className="mx-auto max-w-5xl px-5"><p className="text-[11px] font-medium tracking-[0.1em] text-[#B3541E]">IKORODU, LAGOS</p><h1 className="mt-2 max-w-xl font-heading text-4xl font-medium leading-none">Produce with a story you can see.</h1><button className="mt-6 flex h-12 w-full max-w-lg items-center gap-3 rounded-md border border-[#D9D0C3] bg-white px-4 text-sm text-[#8C8C7A]"><Search size={18} /> Search nearby produce</button>
        <div className="mt-8 flex items-center justify-between"><h2 className="font-heading text-2xl font-medium">Fresh today</h2><span className="flex items-center gap-1 text-xs text-[#4A4A42]"><MapPin size={14} /> Within 12km</span></div>
        <article className="mt-4 grid overflow-hidden border border-[#D9D0C3] bg-white sm:grid-cols-[1.1fr_1fr]"><div className="relative min-h-60"><Image src="/images/produce-tomatoes.png" alt="Fresh tomatoes from Amaka's Farm" fill className="object-cover" /></div><div className="p-5"><div className="flex items-center justify-between"><p className="text-[11px] font-medium tracking-[0.08em] text-[#2A6B45]">FRESCO VERIFIED · 82/100</p><span className="border border-[#D9D0C3] px-2 py-1 text-[9px] tracking-[0.1em] text-[#8C8C7A]">DEMO</span></div><h3 className="mt-3 font-heading text-3xl font-medium">Vine tomatoes</h3><p className="mt-1 text-sm text-[#4A4A42]">Amaka&apos;s Farm · Ikorodu</p><div className="mt-5 flex items-end justify-between"><div><p className="font-heading text-2xl">₦14,600</p><p className="text-xs text-[#8C8C7A]">per 15kg crate</p></div><div className="flex items-center gap-1 text-xs"><Star size={13} className="fill-[#FFC107] text-[#FFC107]" /> 4.9</div></div><button className="mt-6 h-11 w-full rounded-sm bg-[#2D4739] text-sm font-semibold text-[#F5EFE6]">Add to cart</button></div></article></div>
    </main>
  );
}
