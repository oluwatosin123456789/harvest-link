import Link from 'next/link'
import { Leaf, Instagram, Twitter, Linkedin, Mail, ArrowRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-harvest-green text-white pt-16 pb-8 rounded-t-[3rem] mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section: Brand & Newsletter */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
          
          {/* Brand Promise */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-2xl font-serif font-bold italic tracking-wide">
                Harvest-Link
              </span>
            </div>
            <p className="text-green-100 max-w-sm leading-relaxed">
              Bridging the gap between the field and the fork. Join our mission to eliminate post-harvest waste through smart logistics.
            </p>
          </div>

          {/* Newsletter Input */}
          <div className="bg-green-900/50 p-8 rounded-3xl border border-green-800/50 backdrop-blur-sm">
            <h3 className="font-serif text-xl font-bold mb-2">Subscribe to Harvest Alerts</h3>
            <p className="text-green-200 text-sm mb-4">Get notified when fresh produce lands in your area.</p>
            
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-green-950/50 border border-green-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-green-700"
              />
              <button className="bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-xl font-bold transition flex items-center gap-2">
                Join <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        <hr className="border-green-800/50 mb-8" />

        {/* Bottom Section: Links & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex gap-8 text-sm font-medium text-green-200">
            <Link href="#" className="hover:text-white transition">About Us</Link>
            <Link href="#" className="hover:text-white transition">For Farmers</Link>
            <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition">Terms</Link>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-green-900/50 rounded-full flex items-center justify-center hover:bg-green-500 transition cursor-pointer group">
              <Instagram className="w-5 h-5 text-green-300 group-hover:text-white" />
            </div>
            <div className="w-10 h-10 bg-green-900/50 rounded-full flex items-center justify-center hover:bg-green-500 transition cursor-pointer group">
              <Twitter className="w-5 h-5 text-green-300 group-hover:text-white" />
            </div>
            <div className="w-10 h-10 bg-green-900/50 rounded-full flex items-center justify-center hover:bg-green-500 transition cursor-pointer group">
              <Linkedin className="w-5 h-5 text-green-300 group-hover:text-white" />
            </div>
            <div className="w-10 h-10 bg-green-900/50 rounded-full flex items-center justify-center hover:bg-green-500 transition cursor-pointer group">
              <Mail className="w-5 h-5 text-green-300 group-hover:text-white" />
            </div>
          </div>

        </div>
        
        <div className="text-center mt-8 text-xs text-green-400 font-medium tracking-widest uppercase">
          © 2026 Harvest-Link Logistics. Built in Lagos.
        </div>
      </div>
    </footer>
  )
}