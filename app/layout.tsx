import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { HarvestLinkProvider } from "./providers/HarvestLinkProvider";

/* ─────────────────────────────────────────────
 * Typography — "The Modern Agrarian"
 * Heading: Cormorant Garamond (Serif) — editorial, commanding
 * Body/UI: Space Grotesk — precise, logistical
 * ───────────────────────────────────────────── */

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* Data/identifier font — order IDs, farmer refs, timestamps.
 * The design uses it anywhere a value is machine-generated. */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harvest–Link · Closing the Distance Between Soil and Table",
  description:
    "Location-matched produce from Nigerian farms to your hands in hours, not days. A logistics-first platform reducing post-harvest food loss.",
  keywords: [
    "agriculture",
    "Nigeria",
    "farmers",
    "fresh produce",
    "logistics",
    "food loss",
    "farm to table",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body antialiased bg-toasted-grain text-deep-charcoal">
        <HarvestLinkProvider>{children}</HarvestLinkProvider>
      </body>
    </html>
  );
}