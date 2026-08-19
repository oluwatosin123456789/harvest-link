import FarmerSidebar from "@/Components/dashboard/FarmerSidebar";
import { ReactNode } from "react";

export default function FarmerDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F5EFE6] font-body selection:bg-burnt-clay/30 selection:text-white md:bg-[#111410]">
      <FarmerSidebar />
      <main className="w-full flex-1 overflow-y-auto md:p-8">
        <div className="mx-auto max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
}
