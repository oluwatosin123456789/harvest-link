import ScoreDistributionChart from '@/Components/dashboard/ScoreDistributionChart';
import RevenueTrendChart from '@/Components/dashboard/RevenueTrendChart';
import FarmerTable from '@/Components/dashboard/FarmerTable';

export default function AdminDashboardPage() {
  const scoreData = [
    { band: 'Strong', count: 14, color: '#2D4739' },
    { band: 'Established', count: 63, color: '#5A8A6E' },
    { band: 'Developing', count: 98, color: '#FFC107' },
    { band: 'Emerging', count: 72, color: '#6B6560' },
  ];

  const revenueData = [
    { month: 'Mar', value: 3200000 },
    { month: 'Apr', value: 4100000 },
    { month: 'May', value: 5400000 },
    { month: 'Jun', value: 6200000 },
    { month: 'Jul', value: 6800000 },
    { month: 'Aug', value: 5500000 },
  ];

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between space-y-4 sm:space-y-0 pb-4 border-b border-[#E5E0D8]">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-deep-charcoal">WEMA BANK | HARVEST-LINK AGRICULTURAL PORTFOLIO</h1>
          <p className="text-warm-gray mt-1">Review active farmer profiles and assess platform economic activity.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-medium text-warm-gray uppercase tracking-wider">Location Filter</label>
            <select className="bg-white border border-warm-gray/30 rounded px-3 py-1.5 text-sm text-deep-charcoal focus:outline-none focus:border-forest-moss">
              <option>Lagos Pilot</option>
              <option>Oyo Pilot</option>
              <option>All Regions</option>
            </select>
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-medium text-warm-gray uppercase tracking-wider">Time Period</label>
            <select className="bg-white border border-warm-gray/30 rounded px-3 py-1.5 text-sm text-deep-charcoal focus:outline-none focus:border-forest-moss">
              <option>Last 6 Months</option>
              <option>Year to Date</option>
              <option>Last 12 Months</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#E5E0D8] shadow-sm">
          <p className="text-sm font-medium text-warm-gray">Total Registered Farmers</p>
          <p className="text-3xl font-heading font-semibold text-deep-charcoal mt-2">247</p>
          <p className="text-xs text-forest-moss mt-1 font-medium">+12 this month</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#E5E0D8] shadow-sm">
          <p className="text-sm font-medium text-warm-gray">Active This Month</p>
          <div className="flex items-baseline space-x-2 mt-2">
            <p className="text-3xl font-heading font-semibold text-deep-charcoal">189</p>
            <p className="text-sm font-medium text-warm-gray">(76%)</p>
          </div>
          <p className="text-xs text-warm-gray mt-1">Transacted in last 30 days</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#E5E0D8] shadow-sm">
          <p className="text-sm font-medium text-warm-gray">Total Platform Transactions</p>
          <p className="text-3xl font-heading font-semibold text-deep-charcoal mt-2">3,841</p>
          <p className="text-xs text-forest-moss mt-1 font-medium">+14% vs last period</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#E5E0D8] shadow-sm border-l-4 border-l-forest-moss">
          <p className="text-sm font-medium text-warm-gray">Total Transaction Volume</p>
          <p className="text-3xl font-heading font-semibold text-forest-moss mt-2">₦31.2M</p>
          <p className="text-xs text-warm-gray mt-1">Gross Merchandise Value (6mo)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Distribution Chart */}
        <div className="bg-white p-6 rounded-xl border border-[#E5E0D8] shadow-sm col-span-1">
          <h2 className="font-heading text-xl font-semibold text-deep-charcoal mb-4">Score Distribution</h2>
          <ScoreDistributionChart data={scoreData} />
          <p className="text-xs text-warm-gray mt-4">
            <span className="font-medium text-deep-charcoal">Note:</span> 
            The Farmer Economic Activity Profile (FEAP) is a proprietary Harvest-Link score.
          </p>
        </div>

        {/* Revenue Trend Chart */}
        <div className="bg-white p-6 rounded-xl border border-[#E5E0D8] shadow-sm col-span-1 lg:col-span-2">
          <h2 className="font-heading text-xl font-semibold text-deep-charcoal mb-4">Monthly GMV Trend</h2>
          <RevenueTrendChart data={revenueData} />
        </div>
      </div>

      {/* Financial Review Pipeline */}
      <div className="bg-forest-moss rounded-xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="relative z-10 flex-1">
          <h2 className="font-heading text-2xl font-semibold mb-2">Financial Review Pipeline</h2>
          <p className="text-white/80 text-sm max-w-2xl">
            Harvest-Link has identified farmers with consistent economic activity who have consented to share their profiles with Wema Bank for potential financial services.
          </p>
        </div>
        <div className="relative z-10 flex space-x-8">
          <div>
            <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Consented</p>
            <p className="font-heading text-3xl font-semibold">78</p>
          </div>
          <div>
            <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Eligible (&gt;6mo)</p>
            <p className="font-heading text-3xl font-semibold">41</p>
          </div>
          <div>
            <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Strong Target</p>
            <p className="font-heading text-3xl font-semibold text-[#5A8A6E]">31</p>
          </div>
        </div>
        <div className="relative z-10 flex flex-col space-y-2">
          <button className="bg-white text-forest-moss px-4 py-2 rounded-lg font-medium text-sm hover:bg-[#F5EFE6] transition-colors whitespace-nowrap">
            View Pipeline
          </button>
          <button className="border border-white/30 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-white/10 transition-colors whitespace-nowrap">
            Export Report
          </button>
        </div>
      </div>

      {/* Farmers Table */}
      <div className="bg-white rounded-xl border border-[#E5E0D8] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E5E0D8]">
          <h2 className="font-heading text-xl font-semibold text-deep-charcoal">Farmer Directory</h2>
          <p className="text-sm text-warm-gray mt-1">Detailed directory of all registered farmers in the selected region.</p>
        </div>
        <div className="p-6 pt-2">
          <FarmerTable />
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="bg-warm-gray/10 rounded-lg p-4 text-center">
        <p className="text-xs text-warm-gray max-w-4xl mx-auto">
          <span className="font-bold text-deep-charcoal">CRITICAL NOTICE:</span> This profile is a decision-support tool. Wema Bank's lending decisions are made independently using Wema's own approved underwriting processes. This profile does not constitute a loan offer or guarantee.
        </p>
      </div>
    </div>
  );
}
