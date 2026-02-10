import { Search, MapPin, Sprout, ChevronDown } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative h-[85vh] min-h-[600px] flex flex-col items-center justify-center px-4 overflow-hidden">
      
      
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1769442872238-e1912656f940?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Farm Landscape" 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-harvest-green/90" />
      </div>

      
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center mt-16">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6 animate-fade-in-up">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-white text-xs font-bold tracking-widest uppercase">Live Market: 450+ Active Farms    </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-2xl">
          Your Dream Harvest, <br /> Just a Click Away.
        </h1>
        <p className="text-lg md:text-xl text-green-50 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Browse live listings, connect with local farmers, and find the perfect produce 
          delivered from the field to your door.
        </p>

        {/* 3. The "Real Estate" Floating Search Bar */}
        <div className="bg-white p-2 rounded-full shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-2 md:gap-0">
          
          {/* Input 1: Produce Type */}
          <div className="flex-1 w-full flex items-center gap-3 px-6 py-3 md:border-r border-gray-100 relative group cursor-pointer hover:bg-gray-50 rounded-full transition">
            <Sprout className="w-5 h-5 text-harvest-green" />
            <div className="text-left">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Produce Type</p>
              <p className="text-gray-800 font-medium">Tubers, Veg, Fruits</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-300 ml-auto group-hover:text-harvest-green" />
          </div>

          {/* Input 2: Location */}
          <div className="flex-1 w-full flex items-center gap-3 px-6 py-3 md:border-r border-gray-100 relative group cursor-pointer hover:bg-gray-50 rounded-full transition">
            <MapPin className="w-5 h-5 text-harvest-green" />
            <div className="text-left">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Location</p>
              <p className="text-gray-800 font-medium">Lagos, Abuja...</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-300 ml-auto group-hover:text-harvest-green" />
          </div>

          {/* Input 3: Budget/Quantity (Optional) */}
          <div className="hidden lg:flex flex-1 w-full items-center gap-3 px-6 py-3 relative group cursor-pointer hover:bg-gray-50 rounded-full transition">
            <div className="text-left w-full">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Price Range</p>
              <p className="text-gray-800 font-medium">Any Price</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-300 ml-auto group-hover:text-harvest-green" />
          </div>

          {/* Search Button */}
          <button className="bg-harvest-green hover:bg-green-400 text-white p-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-green-900/30 flex items-center gap-2 w-full md:w-auto justify-center px-8">
            <Search className="w-5 h-5" />
            <span className="md:hidden font-bold">Search Now</span>
          </button>
          
        </div>

      </div>
    </section>
  )
}