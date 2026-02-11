'use client'

import Link from 'next/link'
import { ArrowLeft, Leaf, Sprout, ShoppingBasket } from 'lucide-react'
import { useState } from 'react'

export default function SelectUserType() {
  const [selectedType, setSelectedType] = useState<'farmer' | 'buyer' | null>(null)

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      {/* Header/Navbar */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Go Back */}
            <Link
              href="/"
              className="flex items-center gap-2 text-[#1B4332] hover:opacity-70 transition-opacity"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-medium">Go Back</span>
            </Link>

            {/* Logo (Centered) */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              <Leaf size={28} className="text-[#1B4332]" />
              <span className="text-2xl font-bold text-[#1B4332]" style={{ fontFamily: 'Playfair Display, serif' }}>
                Harvest-Link
              </span>
            </div>

            {/* Spacer for balance */}
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-12">
        {/* Title */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1B4332] text-center mb-12"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Welcome to Harvest-Link
        </h1>

        {/* Progress Bar */}
        <div className="w-full max-w-3xl mb-16">
          <div className="flex items-center justify-center gap-2">
            {/* Step 1 - Active */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#1B4332] flex items-center justify-center text-white font-bold text-lg mb-2">
                1
              </div>
              <span className="text-xs font-bold text-[#1B4332] text-center uppercase tracking-wide">
                Select User Type
              </span>
            </div>

            {/* Connector Line 1 */}
            <div className="w-24 sm:w-32 md:w-40 h-1 bg-[#E6F4EA] -mb-8"></div>

            {/* Step 2 - Inactive */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#E6F4EA] border-2 border-gray-300 flex items-center justify-center text-gray-500 font-bold text-lg mb-2">
                2
              </div>
              <span className="text-xs font-semibold text-gray-500 text-center uppercase tracking-wide">
                Basic Details
              </span>
            </div>

            {/* Connector Line 2 */}
            <div className="w-24 sm:w-32 md:w-40 h-1 bg-[#E6F4EA] -mb-8"></div>

            {/* Step 3 - Inactive */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#E6F4EA] border-2 border-gray-300 flex items-center justify-center text-gray-500 font-bold text-lg mb-2">
                3
              </div>
              <span className="text-xs font-semibold text-gray-500 text-center uppercase tracking-wide">
                Verification
              </span>
            </div>
          </div>
        </div>

        {/* Main Prompt */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1B4332] mb-3"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            How would you like to Sign Up?
          </h2>
          <p className="text-gray-600 text-lg font-medium">Select a user type to continue.</p>
        </div>

        {/* Cards Grid - Two Large Cards */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 px-4">
          {/* Farmer Card */}
          <button
            onClick={() => setSelectedType('farmer')}
            className={`group rounded-2xl shadow-xl overflow-hidden bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
              selectedType === 'farmer' ? 'ring-4 ring-[#1B4332]' : ''
            }`}
          >
            {/* Icon Area */}
            <div className="bg-[#E6F4EA] h-48 flex items-center justify-center">
              <Sprout size={96} className="text-[#1B4332] group-hover:scale-110 transition-transform duration-300" />
            </div>
            
            {/* Text Area */}
            <div className="p-8">
              <h3 
                className="text-3xl font-bold text-[#1B4332] mb-4" 
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Farmer
              </h3>
              <p className="text-gray-600 text-base font-medium leading-relaxed">
                I want to list and sell my fresh produce directly to local buyers.
              </p>
            </div>
          </button>

          {/* Buyer Card */}
          <button
            onClick={() => setSelectedType('buyer')}
            className={`group rounded-2xl shadow-xl overflow-hidden bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
              selectedType === 'buyer' ? 'ring-4 ring-[#1B4332]' : ''
            }`}
          >
            {/* Icon Area */}
            <div className="bg-[#E6F4EA] h-48 flex items-center justify-center">
              <ShoppingBasket size={96} className="text-[#1B4332] group-hover:scale-110 transition-transform duration-300" />
            </div>
            
            {/* Text Area */}
            <div className="p-8">
              <h3 
                className="text-3xl font-bold text-[#1B4332] mb-4" 
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Buyer
              </h3>
              <p className="text-gray-600 text-base font-medium leading-relaxed">
                I want to discover and purchase fresh, locally grown farm produce.
              </p>
            </div>
          </button>
        </div>

        {/* Action Button - Only appears when a type is selected */}
        {selectedType && (
          <Link
            href={`/auth/signup/${selectedType}`}
            className="px-10 py-4 bg-[#1B4332] text-white font-bold text-lg rounded-lg hover:bg-[#2d5a47] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Continue as {selectedType === 'farmer' ? 'Farmer' : 'Buyer'}
          </Link>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 px-4 bg-white mt-auto">
        <p className="text-center text-sm text-gray-600 font-medium">
          © 2026 Harvest-Link. All Rights Reserved.
        </p>
      </footer>
    </div>
  )
}