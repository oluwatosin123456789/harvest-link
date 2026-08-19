import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  icon?: ReactNode;
}

export default function StatCard({ title, value, subtitle, trend, icon }: StatCardProps) {
  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 flex flex-col justify-between h-full hover:border-[#3A3A3A] transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[#6B6560] tracking-wide">{title}</h3>
        {icon && <div className="text-[#6B6560]">{icon}</div>}
      </div>
      <div>
        <p className="text-3xl font-heading font-medium text-[#E8E4DF]">{value}</p>
        <div className="flex items-center gap-2 mt-2">
          {trend === "up" && (
            <span className="flex items-center text-xs font-medium text-[#2D4739] bg-[#2D4739]/10 px-2 py-0.5 rounded-full">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
              Up
            </span>
          )}
          {trend === "down" && (
            <span className="flex items-center text-xs font-medium text-[#B3541E] bg-[#B3541E]/10 px-2 py-0.5 rounded-full">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
              Down
            </span>
          )}
          {subtitle && <span className="text-xs text-[#6B6560]">{subtitle}</span>}
        </div>
      </div>
    </div>
  );
}
