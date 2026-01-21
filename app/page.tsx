import Navbar from "@/Components/Navbar"
import Hero from "@/Components/Hero"

export default function Home() {
  return (
    <main className="bg-cream min-h-screen">
      <Navbar />
      <Hero />
      
      {/* The rest of your sections (Grid, Footer) go here */}
      <div className="py-20 text-center">
        <h2 className="text-3xl font-serif text-harvest-green">Fresh from the Field</h2>
        {/* Your Product Grid Component will go here */}
      </div>
    </main>
  )
}