import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

/* ─────────────────────────────────────────────
 * Fresco Scanner API — AI Produce Intelligence
 *
 * Accepts a produce photo (base64) and returns:
 * - Freshness score (0-100)
 * - Freshness category (Excellent/Good/Fair/Poor)
 * - Estimated shelf life (days)
 * - Detected produce type
 * - Confidence score
 * - Storage recommendations
 *
 * Uses Google Gemini Vision API.
 * ───────────────────────────────────────────── */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

const SYSTEM_PROMPT = `You are Fresco, an AI produce freshness assessment system for Harvest-Link, a Nigerian agricultural platform.

Analyze the provided image of fresh produce and return a JSON assessment with these fields:

{
  "detected_produce": "name of the produce (e.g., Tomatoes, Peppers, Yams, Plantain)",
  "freshness_score": <number 0-100>,
  "freshness_category": "<Excellent|Good|Fair|Poor>",
  "estimated_shelf_life_days": <number>,
  "confidence_score": <number 0-100>,
  "visual_indicators": ["list of visual observations"],
  "storage_recommendations": ["list of storage tips"],
  "ethylene_sensitivity": "<High|Medium|Low>"
}

Scoring guide:
- 85-100 (Excellent): Just harvested, vibrant color, firm texture, no blemishes
- 65-84 (Good): Fresh but beginning to show minor signs of age, still ideal for sale
- 40-64 (Fair): Noticeable aging, should be sold/consumed quickly
- 0-39 (Poor): Significant deterioration, high risk of spoilage

Be calibrated for Nigerian produce varieties and tropical climate conditions.
Always return valid JSON only, no markdown formatting.`

export async function POST(request: NextRequest) {
  try {
    /* Verify authentication */
    const supabase = await createServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { image_base64, listing_id } = body

    if (!image_base64) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    if (!GEMINI_API_KEY) {
      /* Fallback: return mock data if no API key configured */
      const mockResult = {
        detected_produce: "Tomatoes",
        freshness_score: 84,
        freshness_category: "Excellent",
        estimated_shelf_life_days: 4,
        confidence_score: 91,
        visual_indicators: [
          "Vibrant red coloring throughout",
          "Firm skin with no wrinkles",
          "Green stem attachment intact",
          "No visible blemishes or soft spots"
        ],
        storage_recommendations: [
          "Store at room temperature for best flavor",
          "Keep away from direct sunlight",
          "Do not refrigerate until fully ripe"
        ],
        ethylene_sensitivity: "High",
        is_mock: true
      }

      /* Store the scan */
      await supabase.from('produce_scans').insert({
        farmer_id: user.id,
        listing_id: listing_id || null,
        freshness_score: mockResult.freshness_score,
        freshness_category: mockResult.freshness_category,
        estimated_shelf_life_days: mockResult.estimated_shelf_life_days,
        detected_produce: mockResult.detected_produce,
        confidence_score: mockResult.confidence_score,
      })

      return NextResponse.json(mockResult)
    }

    /* Call Gemini Vision API */
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`

    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: SYSTEM_PROMPT },
            {
              inline_data: {
                mime_type: 'image/jpeg',
                data: image_base64
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1024,
        }
      })
    })

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text()
      console.error('Gemini API error:', errorText)
      return NextResponse.json({ error: 'AI analysis failed' }, { status: 502 })
    }

    const geminiData = await geminiResponse.json()
    const responseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text

    if (!responseText) {
      return NextResponse.json({ error: 'Empty AI response' }, { status: 502 })
    }

    /* Parse the JSON response — strip any markdown wrapping */
    const cleanedText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const result = JSON.parse(cleanedText)

    /* Store the scan in the database */
    /* A failed insert must not sink the scan — the assessment is still
     * returned to the farmer; only the audit row is lost. */
    const { data: scan } = await supabase.from('produce_scans').insert({
      farmer_id: user.id,
      listing_id: listing_id || null,
      freshness_score: result.freshness_score,
      freshness_category: result.freshness_category,
      estimated_shelf_life_days: result.estimated_shelf_life_days,
      detected_produce: result.detected_produce,
      confidence_score: result.confidence_score,
      scan_image_url: null, // TODO: upload to Supabase Storage
    }).select().single()

    return NextResponse.json({
      ...result,
      scan_id: scan?.id,
      is_mock: false
    })

  } catch (error) {
    console.error('Scanner error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
