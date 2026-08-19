"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface RevenueTrendChartProps {
  data: {
    month: string;
    value: number;
  }[];
}

export default function RevenueTrendChart({ data }: RevenueTrendChartProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2D4739" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#2D4739" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E0D8" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B6560', fontSize: 12, dy: 10 }} />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B6560', fontSize: 12 }} 
            tickFormatter={(value) => `₦${(value / 1000000).toFixed(1)}M`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1A1A1A', color: '#F5EFE6', borderRadius: '8px', border: 'none' }}
            formatter={(value) => [`₦${Number(value).toLocaleString()}`, 'Volume']}
          />
          <Area type="monotone" dataKey="value" stroke="#2D4739" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
