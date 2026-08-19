"use client";

import { useState, useRef } from "react";
import { useHarvestLink } from "@/app/providers/HarvestLinkProvider";
import Link from "next/link";

/* ─────────────────────────────────────────────
 * Fresco Scanner Page — AI Produce Intelligence
 *
 * Camera/upload interface for produce scanning.
 * Shows real-time freshness assessment results.
 * Lives inside the farmer dashboard.
 * ───────────────────────────────────────────── */

interface ScanResult {
  detected_produce: string;
  freshness_score: number;
  freshness_category: string;
  estimated_shelf_life_days: number;
  confidence_score: number;
  visual_indicators: string[];
  storage_recommendations: string[];
  ethylene_sensitivity: string;
  is_mock?: boolean;
  scan_id?: string;
}

export default function ScannerPage() {
  const { recordScan } = useHarvestLink();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    /* Preview */
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImagePreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);

    /* Convert to base64 for API */
    const base64Reader = new FileReader();
    base64Reader.onload = async (ev) => {
      const base64 = (ev.target?.result as string).split(",")[1];
      await performScan(base64);
    };
    base64Reader.readAsDataURL(file);
  }

  async function performScan(imageBase64: string) {
    setScanning(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_base64: imageBase64 }),
      });

      if (!response.ok) {
        throw new Error("Scan failed");
      }

      const data = await response.json();
      setResult(data);

      /* Hand the assessment to the walkthrough thread so the listing
       * screen can attach it without the farmer re-entering anything. */
      recordScan({
        detectedProduce: data.detected_produce,
        freshnessScore: data.freshness_score,
        freshnessCategory: data.freshness_category,
        shelfLifeDays: data.estimated_shelf_life_days,
        confidence: data.confidence_score,
        storage: data.storage_recommendations?.[0] ?? "Cool, dry area",
        indicators: data.visual_indicators ?? [],
        live: !data.is_mock,
      });
    } catch {
      setError("Scan failed. Please try again.");
    } finally {
      setScanning(false);
    }
  }

  function resetScan() {
    setImagePreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function getScoreColor(score: number) {
    if (score >= 85) return "#2D4739";
    if (score >= 65) return "#5A8A6E";
    if (score >= 40) return "#FFC107";
    return "#B3541E";
  }

  function getCategoryBg(cat: string) {
    switch (cat) {
      case "Excellent": return "bg-[#2D4739]";
      case "Good": return "bg-[#5A8A6E]";
      case "Fair": return "bg-[#FFC107] !text-deep-charcoal";
      case "Poor": return "bg-[#B3541E]";
      default: return "bg-warm-gray";
    }
  }

  return (
    <div className="min-h-screen p-6 lg:p-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="font-body text-[11px] font-medium tracking-[1.5px] uppercase text-[#B3541E] mb-2">
            Fresco AI
          </p>
          <h1 className="font-heading text-3xl font-semibold text-[#E8E4DF]">
            Produce Scanner
          </h1>
          <p className="font-body text-[14px] text-[#6B6560] mt-2">
            Photograph your produce to get an AI freshness assessment. Every scan builds your financial record.
          </p>
        </div>

        {/* Scanner Area */}
        {!result ? (
          <div className="space-y-6">

            {/* Upload Zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative rounded-2xl border-2 border-dashed border-[#2A2A2A] hover:border-[#B3541E] transition-colors cursor-pointer overflow-hidden"
              style={{ aspectRatio: "4/3" }}
            >
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Produce to scan"
                    className="w-full h-full object-cover"
                  />
                  {scanning && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                      {/* Scanning Animation */}
                      <div className="w-3/4 h-[2px] bg-[#B3541E] rounded-full relative overflow-hidden mb-4">
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFC107] to-transparent"
                          style={{
                            animation: "shimmer-scan 1.5s ease-in-out infinite",
                          }}
                        />
                      </div>
                      <p className="font-body text-[14px] text-[#E8E4DF] animate-gentle-pulse">
                        Analyzing produce...
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {/* Camera Icon */}
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-4">
                    <rect x="6" y="14" width="36" height="26" rx="4" stroke="#6B6560" strokeWidth="2" />
                    <circle cx="24" cy="27" r="7" stroke="#6B6560" strokeWidth="2" />
                    <circle cx="24" cy="27" r="3" stroke="#6B6560" strokeWidth="1.5" />
                    <path d="M16 14L18 8H30L32 14" stroke="#6B6560" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                  <p className="font-body text-[15px] text-[#6B6560] mb-1">
                    Tap to photograph your produce
                  </p>
                  <p className="font-body text-[12px] text-[#4A4A4A]">
                    JPG or PNG • Clear, well-lit photo recommended
                  </p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {error && (
              <div className="rounded-xl bg-[#B3541E]/10 border border-[#B3541E]/20 p-4">
                <p className="font-body text-[14px] text-[#B3541E]">{error}</p>
              </div>
            )}

            {imagePreview && !scanning && (
              <button onClick={resetScan} className="font-body text-[13px] text-[#6B6560] underline">
                Choose a different photo
              </button>
            )}
          </div>
        ) : (
          /* ── Scan Results ──────────────────── */
          <div className="space-y-6 animate-fade-up">

            {/* Score Header */}
            <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-[#2A2A2A]">
              <div className="flex items-start gap-6">
                {/* Produce Image Thumbnail */}
                {imagePreview && (
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={imagePreview} alt="Scanned produce" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex-1">
                  <p className="font-body text-[12px] text-[#6B6560] uppercase tracking-[1px] mb-1">
                    Detected
                  </p>
                  <h2 className="font-heading text-2xl font-semibold text-[#E8E4DF]">
                    {result.detected_produce}
                  </h2>

                  <div className="flex items-center gap-4 mt-4">
                    {/* Score Circle */}
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center border-[3px]"
                      style={{ borderColor: getScoreColor(result.freshness_score) }}
                    >
                      <span className="font-heading text-xl font-bold text-[#E8E4DF]">
                        {result.freshness_score}
                      </span>
                    </div>

                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-[12px] font-medium text-[#E8E4DF] ${getCategoryBg(result.freshness_category)}`}>
                        {result.freshness_category}
                      </span>
                      <p className="font-body text-[13px] text-[#6B6560] mt-1">
                        Est. {result.estimated_shelf_life_days} days of usable life
                      </p>
                    </div>
                  </div>

                  <p className="font-body text-[11px] text-[#4A4A4A] mt-3">
                    Confidence: {result.confidence_score}%
                    {result.is_mock && " · Demo mode (no API key configured)"}
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Indicators */}
            <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#2A2A2A]">
              <h3 className="font-body text-[11px] font-medium tracking-[1.5px] uppercase text-[#6B6560] mb-4">
                Visual Observations
              </h3>
              <ul className="space-y-3">
                {result.visual_indicators?.map((indicator, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
                      <circle cx="8" cy="8" r="8" fill="#2D4739" opacity="0.2" />
                      <path d="M5 8.5L7 10.5L11 6.5" stroke="#2D4739" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-body text-[14px] text-[#E8E4DF]">{indicator}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Storage Recommendations */}
            <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#2A2A2A]">
              <h3 className="font-body text-[11px] font-medium tracking-[1.5px] uppercase text-[#6B6560] mb-4">
                Storage Recommendations
              </h3>
              <ul className="space-y-3">
                {result.storage_recommendations?.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
                      <path d="M8 3V11M5 8L8 11L11 8" stroke="#FFC107" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-body text-[14px] text-[#E8E4DF]">{rec}</span>
                  </li>
                ))}
              </ul>
              <p className="font-body text-[12px] text-[#4A4A4A] mt-4">
                Ethylene sensitivity: {result.ethylene_sensitivity}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Link
                href="/dashboard/farmer/create-listing"
                className="btn-burnt-clay squircle-sm flex-1 py-4 text-center text-[14px] font-medium"
              >
                Use for listing
              </Link>
              <button
                onClick={resetScan}
                className="btn-outlined squircle-sm flex-1 py-4 text-[14px] font-medium !border-[#2A2A2A] !text-[#E8E4DF] hover:!bg-[#1A1A1A]"
              >
                Scan Another
              </button>
            </div>

            {/* Disclaimer */}
            <p className="font-body text-[11px] text-[#4A4A4A] text-center leading-relaxed">
              Fresco provides an AI-generated estimate, not a food safety certification.
              Results are for informational purposes and should not replace professional assessment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
