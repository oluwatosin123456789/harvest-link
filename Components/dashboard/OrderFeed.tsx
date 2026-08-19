import Link from "next/link";

interface Order {
  id: string;
  produce: string;
  quantity: string;
  buyer: string;
  total: string;
  status: "pending" | "accepted" | "fulfilled" | "cancelled";
  time: string;
}

const DEMO_ORDERS: Order[] = [
  { id: "ORD-993", produce: "Cassava Roots", quantity: "200 kg", buyer: "Iya Meta Foods", total: "₦14,000", status: "pending", time: "2 hours ago" },
  { id: "ORD-992", produce: "Maize Grains", quantity: "500 kg", buyer: "FeedMill Co.", total: "₦65,000", status: "accepted", time: "5 hours ago" },
  { id: "ORD-991", produce: "Tomatoes (Roma)", quantity: "50 baskets", buyer: "ShopRite Int.", total: "₦120,000", status: "fulfilled", time: "Yesterday" },
  { id: "ORD-990", produce: "Fresh Yams", quantity: "100 tubers", buyer: "Chinedu Traders", total: "₦85,000", status: "fulfilled", time: "2 days ago" },
  { id: "ORD-989", produce: "Plantain", quantity: "30 bunches", buyer: "Madam Grace", total: "₦24,000", status: "cancelled", time: "3 days ago" },
];

const statusStyles = {
  pending: "bg-[#FFC107]/10 text-[#FFC107] border-[#FFC107]/20",
  accepted: "bg-[#2D4739]/20 text-[#4CAF50] border-[#2D4739]/30",
  fulfilled: "bg-[#2D4739]/20 text-[#4CAF50] border-[#2D4739]/30",
  cancelled: "bg-red-900/20 text-red-400 border-red-900/30",
};

export default function OrderFeed() {
  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-[#2A2A2A]">
        <h3 className="font-heading text-xl text-[#E8E4DF]">Recent Orders</h3>
      </div>
      <div className="divide-y divide-[#2A2A2A]">
        {DEMO_ORDERS.map((order) => (
          <div key={order.id} className="px-6 py-4 flex items-center justify-between hover:bg-[#202020] transition-colors group cursor-pointer">
            <div className="flex flex-col gap-1">
              <span className="font-medium text-[#E8E4DF]">{order.produce} <span className="text-[#6B6560] font-normal">• {order.quantity}</span></span>
              <span className="text-sm text-[#6B6560]">{order.buyer} • {order.time}</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="font-medium text-[#E8E4DF]">{order.total}</span>
              <span className={`px-2.5 py-1 text-xs rounded-full border capitalize ${statusStyles[order.status]}`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-[#2A2A2A] text-center">
        <Link href="/dashboard/farmer/orders" className="text-sm text-[#6B6560] hover:text-[#E8E4DF] transition-colors">
          View All Orders →
        </Link>
      </div>
    </div>
  );
}
