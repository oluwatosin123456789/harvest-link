import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-dvh bg-[#F5EFE6] text-[#1A1A1A] lg:grid lg:grid-cols-2">
      <section className="relative min-h-[46dvh] overflow-hidden lg:min-h-dvh">
        <Image src="/images/produce-tomatoes.png" alt="" aria-hidden="true" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/65 via-transparent to-[#1A1A1A]/10" />
        <div className="absolute inset-x-6 top-7 flex items-center justify-between text-[#F5EFE6]"><span className="text-[15px] font-semibold uppercase tracking-[0.08em]">Harvest-Link</span><span className="border border-[#F5EFE6]/50 px-2 py-1 text-[9px] font-medium tracking-[0.12em]">DEMO</span></div>
        <p className="absolute inset-x-6 bottom-6 max-w-sm font-heading text-2xl leading-tight text-[#F5EFE6] lg:bottom-12 lg:left-12 lg:text-4xl">Real farm work deserves to be seen.</p>
      </section>
      <section className="flex min-h-[54dvh] items-center px-6 py-10 lg:min-h-dvh lg:px-[12%]"><div className="w-full max-w-md animate-fade-up">
        <div className="mb-8 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#4A4A42]"><Leaf size={14} className="text-[#B3541E]" aria-hidden="true" />Agricultural financial infrastructure</div>
        <h1 className="font-heading text-[42px] font-medium leading-[1.05] tracking-[-0.025em] lg:text-[56px]">From farm activity<br />to financial identity.</h1>
        <p className="mt-5 max-w-[310px] text-sm leading-[22px] text-[#4A4A42]">Sell your produce, build your business record, and create a financial profile from your real activity.</p>
        <div className="mt-8 grid gap-3"><Link href="/auth/signup" className="flex h-[52px] items-center justify-center gap-2 rounded-sm bg-[#2D4739] text-[15px] font-semibold text-[#F5EFE6] transition-colors hover:bg-[#203429] focus:outline-2 focus:outline-offset-2 focus:outline-[#2D4739]">I&apos;m a Farmer <ArrowRight size={17} aria-hidden="true" /></Link><Link href="/marketplace" className="flex h-[52px] items-center justify-center rounded-sm border-[1.5px] border-[#1A1A1A] text-[15px] font-semibold transition-colors hover:bg-[#EDE4D8] focus:outline-2 focus:outline-offset-2 focus:outline-[#2D4739]">I&apos;m looking to buy</Link></div>
        <p className="mt-4 text-center text-[13px] text-[#8C8C7A]">Already have an account? <Link href="/dashboard/farmer" className="underline underline-offset-2">Sign in</Link></p>
      </div></section>
    </main>
  );
}
