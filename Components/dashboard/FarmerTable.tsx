"use client";

import { useState } from 'react';
import Link from 'next/link';

interface Farmer {
  id: string;
  name: string;
  farm: string;
  location: string;
  tenure: string;
  revenue: number;
  feapScore: number;
  scoreBand: 'Strong' | 'Established' | 'Developing' | 'Emerging';
  consentStatus: boolean;
}

const DEMO_FARMERS: Farmer[] = [
  { id: '1', name: 'Amaka Okafor', farm: 'Green Acres', location: 'Lagos Pilot', tenure: '6 mos', revenue: 412000, feapScore: 74, scoreBand: 'Established', consentStatus: true },
  { id: '2', name: 'Babatunde Aliyu', farm: 'Sunshine Farms', location: 'Oyo Pilot', tenure: '12 mos', revenue: 850000, feapScore: 82, scoreBand: 'Strong', consentStatus: true },
  { id: '3', name: 'Chinedu Eze', farm: 'Eze & Sons Agribusiness', location: 'Lagos Pilot', tenure: '3 mos', revenue: 120000, feapScore: 45, scoreBand: 'Developing', consentStatus: false },
  { id: '4', name: 'Funmilayo Adebayo', farm: 'Funmi Organics', location: 'Lagos Pilot', tenure: '8 mos', revenue: 620000, feapScore: 78, scoreBand: 'Strong', consentStatus: true },
  { id: '5', name: 'Idris Musa', farm: 'Northern Star Farms', location: 'Oyo Pilot', tenure: '2 mos', revenue: 45000, feapScore: 28, scoreBand: 'Emerging', consentStatus: false },
  { id: '6', name: 'Ngozi Okorie', farm: 'Okorie Fresh Produce', location: 'Lagos Pilot', tenure: '5 mos', revenue: 310000, feapScore: 68, scoreBand: 'Established', consentStatus: true },
  { id: '7', name: 'Oluwaseun Johnson', farm: 'Johnson Valley', location: 'Oyo Pilot', tenure: '7 mos', revenue: 540000, feapScore: 71, scoreBand: 'Established', consentStatus: true },
  { id: '8', name: 'Blessing Udoh', farm: 'Blessed Harvests', location: 'Lagos Pilot', tenure: '11 mos', revenue: 780000, feapScore: 85, scoreBand: 'Strong', consentStatus: true },
  { id: '9', name: 'Emeka Nwosu', farm: 'Nwosu Farms', location: 'Lagos Pilot', tenure: '4 mos', revenue: 190000, feapScore: 52, scoreBand: 'Developing', consentStatus: false },
  { id: '10', name: 'Zainab Bello', farm: 'Zainab Greens', location: 'Oyo Pilot', tenure: '1 mos', revenue: 25000, feapScore: 22, scoreBand: 'Emerging', consentStatus: false },
];

const bandColors = {
  Strong: 'bg-forest-moss text-white',
  Established: 'bg-[#5A8A6E] text-white',
  Developing: 'bg-sun-yellow text-deep-charcoal',
  Emerging: 'bg-warm-gray text-white'
};

export default function FarmerTable() {
  const [search, setSearch] = useState('');
  
  const filteredFarmers = DEMO_FARMERS.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.farm.toLowerCase().includes(search.toLowerCase()) ||
    f.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="w-full max-w-sm">
        <input 
          type="text" 
          placeholder="Search farmers, farms, or locations..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-0 py-2 bg-transparent border-b border-warm-gray text-deep-charcoal placeholder-warm-gray focus:outline-none focus:border-forest-moss font-body"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left font-body text-sm border-collapse">
          <thead>
            <tr className="border-b border-warm-gray/30 text-warm-gray">
              <th className="py-3 font-medium">Farmer Name</th>
              <th className="py-3 font-medium">Farm</th>
              <th className="py-3 font-medium">Location</th>
              <th className="py-3 font-medium">Tenure</th>
              <th className="py-3 font-medium">Revenue</th>
              <th className="py-3 font-medium">FEAP Score</th>
              <th className="py-3 font-medium">Consent</th>
              <th className="py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredFarmers.map((farmer) => (
              <tr key={farmer.id} className="border-b border-warm-gray/10 hover:bg-warm-gray/5 transition-colors">
                <td className="py-4 font-medium text-deep-charcoal">{farmer.name}</td>
                <td className="py-4 text-deep-charcoal">{farmer.farm}</td>
                <td className="py-4 text-warm-gray">{farmer.location}</td>
                <td className="py-4 text-warm-gray">{farmer.tenure}</td>
                <td className="py-4 font-medium text-deep-charcoal">₦{farmer.revenue.toLocaleString()}</td>
                <td className="py-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-deep-charcoal">{farmer.feapScore}</span>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${bandColors[farmer.scoreBand]}`}>
                      {farmer.scoreBand}
                    </span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center space-x-1.5">
                    <div className={`w-2 h-2 rounded-full ${farmer.consentStatus ? 'bg-forest-moss' : 'bg-warm-gray'}`}></div>
                    <span className="text-xs text-warm-gray">{farmer.consentStatus ? 'Granted' : 'Pending'}</span>
                  </div>
                </td>
                <td className="py-4 text-right">
                  <Link href={`/dashboard/admin/farmer/${farmer.id}`} className="text-forest-moss font-medium hover:underline">
                    Review
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center py-2 text-sm text-warm-gray">
        <span>Showing {filteredFarmers.length} of {DEMO_FARMERS.length} records</span>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-warm-gray/30 rounded text-warm-gray hover:text-deep-charcoal disabled:opacity-50" disabled>Previous</button>
          <button className="px-3 py-1 border border-warm-gray/30 rounded text-warm-gray hover:text-deep-charcoal disabled:opacity-50" disabled>Next</button>
        </div>
      </div>
    </div>
  );
}
