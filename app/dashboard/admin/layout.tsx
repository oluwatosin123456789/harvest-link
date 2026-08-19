import { ReactNode } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FDFAF5] text-[#1A1A1A] font-body selection:bg-forest-moss selection:text-white flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white border-b border-[#E5E0D8] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center space-x-2">
                <span className="font-heading font-bold text-xl text-[#2D4739] tracking-tight">WEMA BANK</span>
                <span className="text-warm-gray text-lg">×</span>
                <span className="font-heading font-semibold text-lg text-deep-charcoal">HARVEST-LINK</span>
              </div>
              <nav className="hidden sm:ml-8 sm:flex sm:space-x-8">
                <Link href="/dashboard/admin" className="border-b-2 border-forest-moss text-deep-charcoal px-1 pt-1 flex items-center text-sm font-medium">
                  Portfolio
                </Link>
                <Link href="#" className="border-b-2 border-transparent text-warm-gray hover:border-warm-gray/30 hover:text-deep-charcoal px-1 pt-1 flex items-center text-sm font-medium">
                  Pipeline
                </Link>
                <Link href="#" className="border-b-2 border-transparent text-warm-gray hover:border-warm-gray/30 hover:text-deep-charcoal px-1 pt-1 flex items-center text-sm font-medium">
                  Reports
                </Link>
                <Link href="#" className="border-b-2 border-transparent text-warm-gray hover:border-warm-gray/30 hover:text-deep-charcoal px-1 pt-1 flex items-center text-sm font-medium">
                  Settings
                </Link>
              </nav>
            </div>
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-deep-charcoal">Credit Risk Team</span>
                  <span className="text-xs text-warm-gray">Lagos Branch</span>
                </div>
                <div className="h-8 w-8 rounded-full bg-forest-moss flex items-center justify-center text-white font-bold text-sm">
                  CR
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
