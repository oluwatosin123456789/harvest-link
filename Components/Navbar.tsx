import Link from 'next/link'
import { User, ShoppingBag, Menu, Leaf } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      {/* The Floating Container */}
      <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-md border border-white/20 shadow-sm rounded-full px-6 py-3 flex justify-between items-center transition-all">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-harvest-green rounded-full flex items-center justify-center group-hover:bg-green-700 transition">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-serif font-bold text-harvest-green tracking-wide">
            Harvest-Link
          </span>
        </Link>

        {/* Desktop Links (Hidden on mobile) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/buy" className="hover:text-harvest-green transition">Buy Produce</Link>
          <Link href="/sell" className="hover:text-harvest-green transition">For Farmers</Link>
          <Link href="/about" className="hover:text-harvest-green transition">Our Impact</Link>
        </div>

        {/* Icons / Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-green-50 rounded-full transition relative">
            <ShoppingBag className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <Link href="/auth/login">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-harvest-green text-green rounded-full hover:bg-black-900 transition cursor-pointer">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:block">Sign In</span>
            </div>
          </Link>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </nav>
  )
}