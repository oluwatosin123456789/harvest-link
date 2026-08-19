"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  ACTIVITY,
  bandForScore,
  DemoListing,
  FEAP_START,
  SEED_LISTINGS,
} from "@/lib/demo-data";
import type { FreshnessCategory } from "@/types/database.types";

/* ─────────────────────────────────────────────
 * Demo carry-forward
 *
 * The 12-step walkthrough only lands if the same
 * tomatoes travel the whole way: scanned by Fresco,
 * published as a listing, bought by a consumer, and
 * showing up as a point of FEAP movement the bank
 * can see.
 *
 * This holds that thread. It deliberately does NOT
 * replace Supabase — /api/scan, /api/orders and
 * /api/produce stay the source of truth wherever
 * they're wired. This is what keeps the narrative
 * intact for the screens that aren't, and what lets
 * the demo run with no network at all.
 *
 * State lives in sessionStorage so a mid-demo refresh
 * doesn't drop the audience back to step 0.
 * ───────────────────────────────────────────── */

export interface ScanResult {
  detectedProduce: string;
  variety?: string;
  freshnessScore: number;
  freshnessCategory: FreshnessCategory;
  shelfLifeDays: number;
  confidence: number;
  storage: string;
  indicators: string[];
  /** True when this came back from Gemini rather than the scripted fallback. */
  live: boolean;
}

export interface CartLine {
  listingId: string;
  produce: string;
  variety: string;
  farmName: string;
  quantityKg: number;
  pricePerKgNgn: number;
  freshnessScore: number;
}

export interface PlacedOrder {
  ref: string;
  lines: CartLine[];
  subtotalNgn: number;
  deliveryNgn: number;
  totalNgn: number;
  placedAt: string;
  fulfilment: "delivery" | "pickup";
}

export interface FeapMovement {
  from: number;
  to: number;
  reason: string;
}

interface HarvestLinkState {
  scan: ScanResult | null;
  listings: DemoListing[];
  cart: CartLine[];
  order: PlacedOrder | null;
  feapScore: number;
  feapMovement: FeapMovement | null;
  consentGranted: boolean;
  consentAt: string | null;
}

interface HarvestLinkValue extends HarvestLinkState {
  feapBand: string;
  completedOrders: number;
  totalVolumeNgn: number;
  cartSubtotalNgn: number;

  recordScan: (scan: ScanResult) => void;
  publishListing: (listing: Omit<DemoListing, "id" | "justListed">) => DemoListing;
  addToCart: (line: CartLine) => void;
  removeFromCart: (listingId: string) => void;
  placeOrder: (fulfilment: "delivery" | "pickup", deliveryNgn: number) => PlacedOrder;
  grantConsent: () => void;
  revokeConsent: () => void;
  resetDemo: () => void;
}

const STORAGE_KEY = "harvest-link:demo";
const DELIVERY_FEE_NGN = 1_200;

const INITIAL: HarvestLinkState = {
  scan: null,
  listings: SEED_LISTINGS,
  cart: [],
  order: null,
  feapScore: FEAP_START,
  feapMovement: null,
  consentGranted: false,
  consentAt: null,
};

const HarvestLinkContext = createContext<HarvestLinkValue | null>(null);

export function HarvestLinkProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<HarvestLinkState>(INITIAL);
  const [hydrated, setHydrated] = useState(false);

  /* Restore after mount — reading storage during render would
   * desync the server-rendered HTML. */
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setState({ ...INITIAL, ...JSON.parse(saved) });
    } catch {
      // Private mode, quota, or corrupt payload — start clean.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Persistence is a convenience; never break the demo over it.
    }
  }, [state, hydrated]);

  const recordScan = useCallback((scan: ScanResult) => {
    setState((s) => ({ ...s, scan }));
  }, []);

  const publishListing = useCallback(
    (listing: Omit<DemoListing, "id" | "justListed">) => {
      const created: DemoListing = {
        ...listing,
        id: `lst-live-${state.listings.length + 1}`,
        justListed: true,
      };
      // Newest first — the buyer should see it at the top of the marketplace.
      setState((s) => ({ ...s, listings: [created, ...s.listings] }));
      return created;
    },
    [state.listings.length],
  );

  const addToCart = useCallback((line: CartLine) => {
    setState((s) => {
      const existing = s.cart.find((l) => l.listingId === line.listingId);
      if (!existing) return { ...s, cart: [...s.cart, line] };
      return {
        ...s,
        cart: s.cart.map((l) =>
          l.listingId === line.listingId
            ? { ...l, quantityKg: l.quantityKg + line.quantityKg }
            : l,
        ),
      };
    });
  }, []);

  const removeFromCart = useCallback((listingId: string) => {
    setState((s) => ({ ...s, cart: s.cart.filter((l) => l.listingId !== listingId) }));
  }, []);

  const placeOrder = useCallback(
    (fulfilment: "delivery" | "pickup", deliveryNgn = DELIVERY_FEE_NGN) => {
      const lines = state.cart;
      const subtotalNgn = lines.reduce((sum, l) => sum + l.quantityKg * l.pricePerKgNgn, 0);
      const delivery = fulfilment === "delivery" ? deliveryNgn : 0;

      const order: PlacedOrder = {
        // Continues the design's sequence — #HL1021 was the last open order.
        ref: `#HL${1024 + (state.order ? 1 : 0)}`,
        lines,
        subtotalNgn,
        deliveryNgn: delivery,
        totalNgn: subtotalNgn + delivery,
        placedAt: new Date().toISOString(),
        fulfilment,
      };

      /* This is the point of the whole demo: a completed sale is
       * evidence, and evidence moves the score. */
      const movement: FeapMovement = {
        from: state.feapScore,
        to: state.feapScore + 1,
        reason: "Transaction consistency strengthened",
      };

      setState((s) => ({
        ...s,
        order,
        cart: [],
        feapScore: movement.to,
        feapMovement: movement,
      }));

      return order;
    },
    [state.cart, state.feapScore, state.order],
  );

  const grantConsent = useCallback(() => {
    setState((s) => ({ ...s, consentGranted: true, consentAt: new Date().toISOString() }));
  }, []);

  const revokeConsent = useCallback(() => {
    setState((s) => ({ ...s, consentGranted: false, consentAt: null }));
  }, []);

  const resetDemo = useCallback(() => {
    setState(INITIAL);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing to clean up.
    }
  }, []);

  const value = useMemo<HarvestLinkValue>(() => {
    const soldThisSession = state.order ? 1 : 0;
    return {
      ...state,
      feapBand: bandForScore(state.feapScore),
      completedOrders: ACTIVITY.completedOrders + soldThisSession,
      totalVolumeNgn: ACTIVITY.totalVolumeNgn + (state.order?.subtotalNgn ?? 0),
      cartSubtotalNgn: state.cart.reduce((sum, l) => sum + l.quantityKg * l.pricePerKgNgn, 0),
      recordScan,
      publishListing,
      addToCart,
      removeFromCart,
      placeOrder,
      grantConsent,
      revokeConsent,
      resetDemo,
    };
  }, [
    state,
    recordScan,
    publishListing,
    addToCart,
    removeFromCart,
    placeOrder,
    grantConsent,
    revokeConsent,
    resetDemo,
  ]);

  return <HarvestLinkContext.Provider value={value}>{children}</HarvestLinkContext.Provider>;
}

export function useHarvestLink() {
  const ctx = useContext(HarvestLinkContext);
  if (!ctx) {
    throw new Error("useHarvestLink must be used inside <HarvestLinkProvider>");
  }
  return ctx;
}
