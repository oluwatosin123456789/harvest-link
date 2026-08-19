import Link from "next/link";

/* ─────────────────────────────────────────────
 * Footer — Minimal. Forest Moss. Editorial.
 *
 * No social icons cluttering the space.
 * No newsletter input.
 * Just the wordmark, a few links, and a copyright.
 * Clean enough to belong in a design gallery.
 * ───────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Farmers", href: "#for-farmers" },
  { label: "For Investors", href: "#" },
  { label: "For Partners", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-forest-moss py-16 lg:py-20 mt-8">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Top — Wordmark + Tagline */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
          <div>
            <p className="font-heading text-2xl font-semibold text-toasted-grain tracking-wide">
              Harvest–Link
            </p>
            <p className="font-body text-[14px] text-toasted-grain/50 mt-2 max-w-sm">
              Converting real agricultural activity into structured financial identity.
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="font-body text-[13px] text-toasted-grain/60 hover:text-toasted-grain transition-colors duration-300 tracking-[0.3px]"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-[1px] bg-toasted-grain/10 mb-8" />

        {/* Bottom — Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-[12px] text-toasted-grain/40 tracking-[0.5px]">
            © {new Date().getFullYear()} Harvest-Link. All rights reserved.
          </p>
          <p className="font-body text-[12px] text-toasted-grain/30 tracking-[0.5px]">
            Built in Lagos, Nigeria.
          </p>
        </div>
      </div>
    </footer>
  );
}