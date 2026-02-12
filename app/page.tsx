import Link from 'next/link'
import Image from 'next/image'

import { Button } from '@/Components/ui/button'
import { Card } from '@/Components/ui/card'
import { MapPin, Truck, CheckCircle, Menu } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
     
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-emerald-700">
                Harvest-Link
              </Link>
            </div>
            
            <div className="hidden md:flex md:items-center md:space-x-8">
              <Link href="#how-it-works" className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition">
                How It Works
              </Link>
              <Link href="#about" className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition">
                About
              </Link>
            </div>

            <div className="hidden md:flex md:items-center md:space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </div>

            <button className="md:hidden p-2">
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>




   {/* Hero Section */}
<section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-hidden rounded-xl">
  {/* Background Image */}
  <Image
    src="/images/nrd-D6Tu_L3chLE-unsplash.jpg"
    alt="Farm Landscape"
    fill
    className="object-cover -z-20"
    priority
    quality={90}
  />
  
  {/* Dark overlay for better text contrast */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 -z-10"></div>
  
  {/* Content */}
  <div className="relative z-10 text-center">
    <h1 className="text-5xl lg:text-7xl font-bold text-green-700 tracking-tight drop-shadow-2xl">
      Find Fresh Food Near You.
    </h1>
    <p className="mt-6 text-xl lg:text-2xl text-green-600 max-w-3xl mx-auto drop-shadow-lg">
      We use location-based matching to connect Nigerian farmers directly with nearby buyers.
    </p>
    
    <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Button 
        size="lg" 
        className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-6 w-full sm:w-auto shadow-2xl"
        asChild
      >
        <Link href="/auth/select-type">I Want to Buy Fresh Food</Link>
      </Button>
      <Button 
        size="lg" 
        variant="outline" 
        className="border-2 border-white bg-white/10 backdrop-blur-sm text-black hover:bg-green/20 text-lg px-8 py-6 w-full sm:w-auto shadow-2xl"
        asChild
      >
        <Link href="/auth/select-type">I Am a Farmer</Link>
      </Button>
    </div>
  </div>
</section>







      
      {/* Two-Worlds Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Farmers Card */}
            <Card className="p-8 lg:p-12 border-2 hover:border-amber-600 transition bg-white">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Stop Losing Your Harvest
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-700">List produce in seconds</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-700">Buyers within 15km</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-700">No middlemen</span>
                </li>
              </ul>
              <Button 
                className="mt-8 w-full bg-amber-700 hover:bg-amber-800" 
                size="lg"
                asChild
              >
                <Link href="/auth/signup?role=farmer">Get Started as Farmer</Link>
              </Button>
            </Card>

            {/* Buyers Card */}
            <Card className="p-8 lg:p-12 border-2 hover:border-emerald-500 transition bg-white">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Buy Fresh at Better Prices
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-700">Farm-gate pricing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-700">See freshness & expiry</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-700">Verified local farms</span>
                </li>
              </ul>
              <Button 
                className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700" 
                size="lg"
                asChild
              >
                <Link href="/auth/signup?role=buyer">Get Started as Buyer</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-6">
                <MapPin className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Farmer lists produce with location
              </h3>
              <p className="text-gray-600">
                Farmers add their fresh produce with GPS coordinates and expiry dates
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-6">
                <Truck className="h-8 w-8 text-amber-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Platform matches nearby buyers
              </h3>
              <p className="text-gray-600">
                Our system automatically shows produce to buyers within optimal delivery radius
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-6">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Direct coordination for faster pickup
              </h3>
              <p className="text-gray-600">
                Buyers and farmers connect directly for quick transactions and delivery
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="about" className="bg-amber-50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Built to Reduce Post-Harvest Food Loss in Nigeria
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Academic final-year project focused on real-world logistics. 
            Using geospatial technology to ensure perishable goods reach consumers 
            before they spoil, reducing waste and supporting local agriculture.
          </p>
        </div>
      </section>

{/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-emerald-700 mb-2">
              Harvest-Link
            </h3>
            <p className="text-gray-600 mb-4">
              Connecting Nigerian farms to local markets through location intelligence
            </p>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Harvest-Link. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
    </div>
  )
}