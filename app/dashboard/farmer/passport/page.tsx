export default function FinancialPassport() {
  const components = [
    { name: "Transaction Consistency", score: 16, max: 20 },
    { name: "Sales Performance", score: 14, max: 20 },
    { name: "Order Fulfillment", score: 13, max: 15 },
    { name: "Customer Trust", score: 11, max: 15 },
    { name: "Business Tenure", score: 7, max: 10 },
    { name: "Quality Consistency", score: 8, max: 10 },
    { name: "Revenue Stability", score: 5, max: 10 },
  ];

  return (
    <div className="space-y-10 max-w-4xl mx-auto pb-12 animate-fade-up">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#2A2A2A] pb-8">
        <div>
          <h1 className="text-4xl font-heading font-medium text-[#E8E4DF]">Financial Passport</h1>
          <p className="text-[#6B6560] mt-2 text-lg">Amaka Okafor • Green Acres Farm • Ogbomoso, Oyo</p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-[#1A1A1A] border border-[#2A2A2A] rounded-full text-sm text-[#E8E4DF]">
            <span className="w-2 h-2 rounded-full bg-[#2D4739]"></span>
            Active since: March 2026 (5 months)
          </div>
        </div>

        <div className="flex items-center gap-6 bg-[#1A1A1A] p-6 rounded-2xl border border-[#2A2A2A]">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#2A2A2A" strokeWidth="8" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="#2D4739" strokeWidth="8" strokeDasharray={`${74 * 2.83} 283`} className="animate-border-pulse" />
            </svg>
            <div className="flex flex-col items-center justify-center z-10">
              <span className="text-3xl font-heading font-bold text-[#E8E4DF]">74</span>
              <span className="text-xs text-[#6B6560]">/ 100</span>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-heading text-[#2D4739] mb-1">Established</h3>
            <p className="text-sm text-[#6B6560]">Consistent Performer</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-heading text-[#E8E4DF] mb-6">Score Components</h2>
            <div className="space-y-6">
              {components.map((c) => (
                <div key={c.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#E8E4DF]">{c.name}</span>
                    <span className="text-[#6B6560] font-medium">{c.score}/{c.max}</span>
                  </div>
                  <div className="h-2 w-full bg-[#1A1A1A] rounded-full overflow-hidden border border-[#2A2A2A]">
                    <div 
                      className="h-full bg-[#B3541E] rounded-full" 
                      style={{ width: `${(c.score / c.max) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-[#1A1A1A] p-8 rounded-2xl border border-[#2A2A2A]">
            <h2 className="text-xl font-heading text-[#E8E4DF] mb-6">Profile Sharing</h2>
            <p className="text-[#6B6560] mb-6 text-sm leading-relaxed">
              Sharing allows Wema Bank to review your profile as part of their own financial product evaluation. This does not guarantee any financial product. You can revoke this at any time.
            </p>
            <div className="flex items-center justify-between border-t border-[#2A2A2A] pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#933D64] flex items-center justify-center text-white font-bold italic shadow-inner">
                  W
                </div>
                <div>
                  <h4 className="text-[#E8E4DF] font-medium text-sm">Wema Bank Evaluation</h4>
                  <p className="text-xs text-[#2D4739] mt-0.5">Active since May 2026</p>
                </div>
              </div>
              <button className="px-4 py-2 border border-[#B3541E] text-[#B3541E] rounded-full text-sm font-medium hover:bg-[#B3541E]/10 transition-colors">
                Revoke Access
              </button>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#2A2A2A]">
            <h2 className="text-lg font-heading text-[#E8E4DF] mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#2D4739]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Positive Signals
            </h2>
            <ul className="space-y-4 text-sm text-[#E8E4DF]">
              <li className="flex items-start gap-3"><span className="text-[#2D4739]">✓</span> 92% order fulfillment rate</li>
              <li className="flex items-start gap-3"><span className="text-[#2D4739]">✓</span> 4 consecutive months of sales</li>
              <li className="flex items-start gap-3"><span className="text-[#2D4739]">✓</span> 38 completed transactions</li>
              <li className="flex items-start gap-3"><span className="text-[#2D4739]">✓</span> 31% repeat customer rate</li>
              <li className="flex items-start gap-3"><span className="text-[#2D4739]">✓</span> Average freshness score: 81/100</li>
            </ul>
          </section>

          <section className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#2A2A2A]">
            <h2 className="text-lg font-heading text-[#E8E4DF] mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#FFC107]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Opportunities to Improve
            </h2>
            <ul className="space-y-4 text-sm text-[#E8E4DF]">
              <li className="flex items-start gap-3"><span className="text-[#FFC107]">→</span> Reduce cancellations (you have 3 farmer-initiated)</li>
              <li className="flex items-start gap-3"><span className="text-[#FFC107]">→</span> Scan produce for every new listing</li>
              <li className="flex items-start gap-3"><span className="text-[#FFC107]">→</span> Maintain sales activity in coming months</li>
            </ul>
          </section>

          <section className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#2A2A2A]">
            <h2 className="text-lg font-heading text-[#E8E4DF] mb-4">Next Milestones</h2>
            <ul className="space-y-4 text-sm text-[#E8E4DF]">
              <li className="flex items-start gap-3"><span className="text-[#6B6560]">□</span> Complete 50 total orders <span className="text-xs text-[#2D4739] ml-1 bg-[#2D4739]/10 px-2 py-0.5 rounded-full">+3 pts</span></li>
              <li className="flex items-start gap-3"><span className="text-[#6B6560]">□</span> Achieve 6 consecutive active months <span className="text-xs text-[#2D4739] ml-1 bg-[#2D4739]/10 px-2 py-0.5 rounded-full">+4 pts</span></li>
              <li className="flex items-start gap-3"><span className="text-[#6B6560]">□</span> Reach 40% repeat customer rate <span className="text-xs text-[#2D4739] ml-1 bg-[#2D4739]/10 px-2 py-0.5 rounded-full">+2 pts</span></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
