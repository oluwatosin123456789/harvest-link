
interface Listing {
  id: string;
  name: string;
  quantity: string;
  price: string;
  score: number;
  status: "active" | "sold_out" | "expired";
}

const DEMO_LISTINGS: Listing[] = [
  { id: "L-1", name: "Premium Cassava Roots", quantity: "500 kg remaining", price: "₦70,000 / 100kg", score: 88, status: "active" },
  { id: "L-2", name: "Yellow Maize", quantity: "200 kg remaining", price: "₦15,000 / 50kg", score: 92, status: "active" },
  { id: "L-3", name: "Fresh Tomatoes (Roma)", quantity: "0 baskets", price: "₦3,000 / basket", score: 85, status: "sold_out" },
  { id: "L-4", name: "Plantain Bunches", quantity: "50 bunches", price: "₦1,500 / bunch", score: 79, status: "active" },
  { id: "L-5", name: "White Yams", quantity: "120 tubers", price: "₦1,200 / tuber", score: 81, status: "active" },
  { id: "L-6", name: "Sweet Potatoes", quantity: "0 kg", price: "₦12,000 / 50kg", score: 70, status: "expired" },
];

export default function ListingsPage() {
  return (
    <div className="space-y-8 animate-fade-up pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-medium text-[#E8E4DF]">My Listings</h1>
          <p className="text-[#6B6560] mt-1">Manage your farm produce and track freshness scores.</p>
        </div>
        <button className="bg-[#B3541E] hover:bg-[#A04A1A] text-white px-6 py-3 rounded-full text-sm font-medium transition-colors shadow-lg">
          Add New Listing
        </button>
      </header>

      <div className="flex gap-2 border-b border-[#2A2A2A] pb-4 overflow-x-auto no-scrollbar">
        <button className="px-4 py-2 bg-[#1A1A1A] border border-[#B3541E] text-[#E8E4DF] rounded-full text-sm whitespace-nowrap">All Produce</button>
        <button className="px-4 py-2 border border-[#2A2A2A] text-[#6B6560] hover:text-[#E8E4DF] rounded-full text-sm whitespace-nowrap transition-colors">Active</button>
        <button className="px-4 py-2 border border-[#2A2A2A] text-[#6B6560] hover:text-[#E8E4DF] rounded-full text-sm whitespace-nowrap transition-colors">Sold Out</button>
        <button className="px-4 py-2 border border-[#2A2A2A] text-[#6B6560] hover:text-[#E8E4DF] rounded-full text-sm whitespace-nowrap transition-colors">Expired</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEMO_LISTINGS.map((listing) => (
          <div key={listing.id} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden hover:border-[#3A3A3A] transition-colors group">
            <div className="h-48 bg-[#111111] relative flex items-center justify-center border-b border-[#2A2A2A]">
              <div className="text-[#2A2A2A]">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
              <div className="absolute top-4 right-4">
                <span className={`px-2.5 py-1 text-xs rounded-full border bg-black/50 backdrop-blur-sm ${
                  listing.status === 'active' ? 'text-[#4CAF50] border-[#2D4739]' : 
                  listing.status === 'sold_out' ? 'text-[#FFC107] border-[#FFC107]/30' : 
                  'text-red-400 border-red-900/50'
                }`}>
                  {listing.status === 'sold_out' ? 'Sold Out' : listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="font-heading text-xl text-[#E8E4DF] mb-1">{listing.name}</h3>
              <p className="text-sm text-[#B3541E] font-medium mb-4">{listing.price}</p>
              
              <div className="flex items-center justify-between text-sm mb-6">
                <span className="text-[#6B6560]">{listing.quantity}</span>
                <span className="flex items-center gap-1 text-[#E8E4DF]">
                  <svg className="w-4 h-4 text-[#2D4739]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Score: {listing.score}
                </span>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-2 text-center text-sm font-medium border border-[#2A2A2A] rounded-lg text-[#E8E4DF] hover:bg-[#202020] transition-colors">
                  Edit
                </button>
                <button className="p-2 border border-[#2A2A2A] rounded-lg text-[#6B6560] hover:text-red-400 hover:border-red-900/30 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
