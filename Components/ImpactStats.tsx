"use client";

import React, { useEffect, useRef, useState } from "react";

function useCountUp(end: number, duration: number, startStr: string, suffix: string, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(easeProgress * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, active]);

  const value = count === 0 ? "0" : Number.isInteger(end) ? Math.floor(count).toString() : count.toFixed(1);
  return `${startStr}${value}${suffix}`;
}

function Stat({ value, label, startStr = "", suffix = "", delay = 0, isVisible }: { value: number, label: string, startStr?: string, suffix?: string, delay?: number, isVisible: boolean }) {
  const displayValue = useCountUp(value, 2000 + delay, startStr, suffix, isVisible);

  return (
    <div className="text-center">
      <h3 className="font-heading text-5xl md:text-7xl font-bold text-toasted-grain mb-4">
        {displayValue}
      </h3>
      <p className="font-body text-[14px] text-toasted-grain/70 uppercase tracking-[1px]">
        {label}
      </p>
    </div>
  );
}

export default function ImpactStats() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-forest-moss overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-8 mb-20">
          <Stat value={3.5} startStr="₦" suffix="T" label="lost annually to post-harvest waste" delay={0} isVisible={isVisible} />
          <Stat value={38} suffix="M" label="smallholder farmers in Nigeria" delay={200} isVisible={isVisible} />
          <Stat value={48} suffix="%" label="tomato spoilage rate" delay={400} isVisible={isVisible} />
        </div>

        <div className="text-center max-w-2xl mx-auto border-t border-toasted-grain/10 pt-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-toasted-grain leading-tight mb-8">
            We don&apos;t need more land.<br />We need less waste.
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-toasted-grain/20 bg-toasted-grain/5">
              <span className="w-2 h-2 rounded-full bg-[#DDA63A]" />
              <span className="font-body text-[12px] text-toasted-grain uppercase tracking-wider">SDG 2: Zero Hunger</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-toasted-grain/20 bg-toasted-grain/5">
              <span className="w-2 h-2 rounded-full bg-[#BF8B2E]" />
              <span className="font-body text-[12px] text-toasted-grain uppercase tracking-wider">SDG 12: Responsible Consumption</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
