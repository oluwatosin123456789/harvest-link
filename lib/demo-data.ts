import type { FreshnessCategory, ScoreBand } from "@/types/database.types";

/* ─────────────────────────────────────────────
 * Demo seed — Amaka Okafor
 *
 * The walkthrough opens on a farmer who already has
 * eight months of history. Her numbers come straight
 * from the Demo canvas so the story matches the design
 * frame for frame.
 *
 * Anything the audience *creates* during the demo
 * (a scan, a listing, an order) is layered on top of
 * this by HarvestLinkProvider — never written back here.
 * ───────────────────────────────────────────── */

export const FARMER = {
  id: "HL-FRM-00417",
  firstName: "Amaka",
  lastName: "Okafor",
  initials: "AO",
  farmName: "Amaka's Farm",
  lga: "Ikorodu",
  state: "Lagos",
  distanceKm: 2.4,
  activeMonths: 8,
  rating: 4.8,
} as const;

/* Headline metrics on the farmer dashboard hero. */
export const ACTIVITY = {
  totalVolumeNgn: 1_840_000,
  completedOrders: 126,
  totalOrders: 135,
  fulfilmentRatePct: 94,
  averageOrderValueNgn: 14_600,
  uniqueCustomers: 61,
} as const;

/* ─────────────────────────────────────────────
 * FEAP — Farmer Economic Activity Profile
 * ───────────────────────────────────────────── */

export const FEAP_BANDS: { band: ScoreBand | "Building"; min: number }[] = [
  { band: "Emerging", min: 0 },
  { band: "Building", min: 30 },
  { band: "Developing", min: 50 },
  { band: "Established", min: 70 },
  { band: "Strong", min: 85 },
];

export function bandForScore(score: number) {
  return [...FEAP_BANDS].reverse().find((b) => score >= b.min)!.band;
}

export const FEAP_START = 78;

/* The five evidence tracks the passport breaks the score into.
 * Each one is sourced from activity the farmer can actually see. */
export const EVIDENCE_TRACKS = [
  {
    key: "transaction_consistency",
    label: "Transaction consistency",
    score: 85,
    evidence: "8 consecutive active months",
  },
  {
    key: "sales_performance",
    label: "Sales performance",
    score: 82,
    evidence: "₦1.84M across 126 completed orders",
  },
  {
    key: "fulfilment",
    label: "Order fulfilment",
    score: 94,
    evidence: "126 of 135 orders accepted and delivered",
  },
  {
    key: "customer_trust",
    label: "Customer trust",
    score: 72,
    evidence: "4.8★ average · 38% repeat customers",
  },
  {
    key: "produce_quality",
    label: "Produce quality",
    score: 78,
    evidence: "Average Fresco estimate 79 across 94 scans",
  },
] as const;

/* ─────────────────────────────────────────────
 * Orders already in flight when the demo opens
 * ───────────────────────────────────────────── */

export type DemoOrderStatus = "preparing" | "ready" | "completed";

export interface DemoOrder {
  ref: string;
  produce: string;
  quantityKg: number;
  totalNgn: number;
  customer: string;
  note: string;
  status: DemoOrderStatus;
}

export const OPEN_ORDERS: DemoOrder[] = [
  {
    ref: "#HL1021",
    produce: "Tomatoes",
    quantityKg: 8,
    totalNgn: 11_200,
    customer: "Chidi E.",
    note: "repeat customer",
    status: "preparing",
  },
  {
    ref: "#HL1019",
    produce: "Cucumber",
    quantityKg: 4,
    totalNgn: 4_800,
    customer: "Ngozi A.",
    note: "pickup today",
    status: "ready",
  },
];

/* ─────────────────────────────────────────────
 * Marketplace stock
 *
 * These sit alongside whatever the farmer publishes
 * during the walkthrough, so the buyer screen never
 * looks empty on a fresh session.
 * ───────────────────────────────────────────── */

export interface DemoListing {
  id: string;
  produce: string;
  variety: string;
  pricePerKgNgn: number;
  quantityKg: number;
  farmName: string;
  distanceKm: number;
  freshnessScore: number;
  freshnessCategory: FreshnessCategory;
  shelfLifeDays: number;
  scannedHoursAgo: number;
  /** True for the listing the farmer creates mid-demo. */
  justListed?: boolean;
}

export const SEED_LISTINGS: DemoListing[] = [
  {
    id: "lst-peppers",
    produce: "Peppers",
    variety: "Scotch bonnet",
    pricePerKgNgn: 1_950,
    quantityKg: 22,
    farmName: "Bello Gardens",
    distanceKm: 3.1,
    freshnessScore: 76,
    freshnessCategory: "Good",
    shelfLifeDays: 6,
    scannedHoursAgo: 5,
  },
  {
    id: "lst-cucumber",
    produce: "Cucumber",
    variety: "Marketmore",
    pricePerKgNgn: 1_200,
    quantityKg: 15,
    farmName: "Amaka's Farm",
    distanceKm: 2.4,
    freshnessScore: 88,
    freshnessCategory: "Excellent",
    shelfLifeDays: 7,
    scannedHoursAgo: 2,
  },
  {
    id: "lst-okra",
    produce: "Okra",
    variety: "Clemson spineless",
    pricePerKgNgn: 900,
    quantityKg: 30,
    farmName: "Ijede Cooperative",
    distanceKm: 5.8,
    freshnessScore: 64,
    freshnessCategory: "Fair",
    shelfLifeDays: 3,
    scannedHoursAgo: 11,
  },
];

/* The scan the demo is scripted around — Roma tomatoes at 82.
 * Used as the fallback when Gemini is unreachable so the
 * walkthrough never dead-ends on a missing API key. */
export const SCRIPTED_SCAN = {
  detectedProduce: "Tomatoes",
  variety: "Roma",
  freshnessScore: 82,
  freshnessCategory: "Good" as FreshnessCategory,
  shelfLifeDays: 4,
  confidence: 91,
  storage: "Cool, dry area — away from direct sun",
  indicators: [
    "Deep, even red colouring across the batch",
    "Firm skin with no soft spots or splitting",
    "Stems still green and attached",
  ],
};

/* ─────────────────────────────────────────────
 * Formatting
 * ───────────────────────────────────────────── */

/** ₦1,840,000 → "₦1.84M" · ₦11,200 → "₦11,200" */
export function formatNaira(amount: number, compact = false): string {
  if (compact && amount >= 1_000_000) {
    return `₦${(amount / 1_000_000).toFixed(2).replace(/\.?0+$/, "")}M`;
  }
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function freshnessLabel(score: number): string {
  if (score >= 85) return "Very fresh";
  if (score >= 65) return "Fresh";
  if (score >= 40) return "Use soon";
  return "Past peak";
}

export function freshnessColor(score: number): string {
  if (score >= 85) return "#2A6B45";
  if (score >= 65) return "#4A8C3F";
  if (score >= 40) return "#C17D0A";
  return "#B3541E";
}
