import Navbar from "@/Components/Navbar";
import Hero from "@/Components/Hero";
import TwoWorlds from "@/Components/TwoWorlds";
import HowItWorks from "@/Components/HowItWorks";
import MapPreview from "@/Components/MapPreview";
import FreshnessCard from "@/Components/FreshnessCard";
import Footer from "@/Components/Footer";

/* ─────────────────────────────────────────────
 * Landing Page — "The Modern Agrarian"
 *
 * Composition order:
 *   1. Navbar     (transparent, overlays hero)
 *   2. Hero       (85vh editorial, bottom-left aligned)
 *   3. TwoWorlds  (farmer/consumer value props)
 *   4. Featured   (sample Freshness Cards)
 *   5. HowItWorks (3-step timeline)
 *   6. MapPreview (contained sand-toned viewport)
 *   7. Footer     (minimal Forest Moss)
 * ───────────────────────────────────────────── */

/* ── Sample produce data for Freshness Cards ── */
const FEATURED_PRODUCE = [
  {
    image: "/images/produce-tomatoes.png",
    name: "Plum Tomatoes",
    farm: "Adeyemi Farm, Ogun",
    distance: "12km away",
    price: "₦2,400 / basket",
    pickedHoursAgo: 4,
    peakFreshnessHours: 18,
    remainingPercent: 80,
  },
  {
    image: "/images/produce-tomatoes.png",
    name: "Sweet Yams",
    farm: "Okafor Heritage, Ondo",
    distance: "8km away",
    price: "₦3,800 / tuber",
    pickedHoursAgo: 2,
    peakFreshnessHours: 72,
    remainingPercent: 95,
  },
  {
    image: "/images/produce-tomatoes.png",
    name: "Fresh Peppers",
    farm: "Ibrahim Greens, Kwara",
    distance: "5km away",
    price: "₦1,200 / basket",
    pickedHoursAgo: 6,
    peakFreshnessHours: 14,
    remainingPercent: 60,
    sellingFast: true,
    remaining: 3,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-toasted-grain">
      <Navbar />
      <Hero />

      {/* ── Two Worlds Section ────────────── */}
      <TwoWorlds />

      {/* ── Featured Produce ─────────────── */}
      <section id="for-farmers" className="py-24 lg:py-32 bg-grain-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-deep-charcoal">
              Fresh From the Soil
            </h2>
            <p className="mt-4 font-body text-[15px] text-warm-gray tracking-[0.3px]">
              What&apos;s growing near you right now — picked hours ago, not days.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {FEATURED_PRODUCE.map((item) => (
              <FreshnessCard key={item.name} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────── */}
      <HowItWorks />

      {/* ── Map Preview ──────────────────── */}
      <MapPreview />

      {/* ── Footer ───────────────────────── */}
      <Footer />
    </div>
  );
}