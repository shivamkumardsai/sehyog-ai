import { GoogleGenAI } from '@google/genai'
import type { AnalysisData } from '@/lib/types/analysis'

const ANALYSIS_PROMPT = `You are a medical report analysis assistant. Read only the report content and return STRICT JSON only.
Do not include markdown, code fences, commentary, or any keys not listed below.
If a value cannot be determined, return an empty string or an empty array.

Required JSON schema:
{
  "summary": "brief plain language summary of the report",
  "risk": "Low Risk | Medium Risk | High Risk | Unknown",
  "recoveryScore": 0,
  "conditions": [],
  "medicines": [],
  "recommendations": [],
  "warnings": [],
  "followUp": "",
  "doctorAdvice": "",
  "confidence": 0
}

Rules:
- recoveryScore is an integer 0-100 based on overall recovery outlook.
- confidence is an integer 0-100 based on how clearly the report supports the analysis.
- Use empty arrays when data is not present.
- Preserve medicine name, dosage, and schedule as a single string when available.
- Do not invent diagnoses, medications, or instructions beyond what the document supports.`

const MAX_GENERATION_ATTEMPTS = 3
const RETRY_DELAY_MS = 1200

type RiskCategory = 'Low Risk' | 'Medium Risk' | 'High Risk' | 'Unknown'

type AnalysisInputPart = {
  text?: string
  inlineData?: { data: string; mimeType: string }
}

function getClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured. Add it to your environment variables.')
  }
  return new GoogleGenAI({ apiKey })
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function clampPercentage(value: unknown) {
  return typeof value === 'number'
    ? Math.min(100, Math.max(0, Math.round(value)))
    : 0
}

function normalizeRisk(value: unknown): RiskCategory {
  if (typeof value !== 'string') {
    return 'Unknown'
  }

  const normalized = value.trim().toLowerCase()
  if (normalized.includes('high')) return 'High Risk'
  if (normalized.includes('medium') || normalized.includes('moderate')) return 'Medium Risk'
  if (normalized.includes('low')) return 'Low Risk'
  return 'Unknown'
}

function parseStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === 'string')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split(/[\r\n,;•]+/)
      .map((item) => item.replace(/^[-•\d\.\)\s]+/, '').trim())
      .filter(Boolean)
  }

  return []
}

function extractJsonLikeText(raw: string) {
  const trimmed = raw.trim()
  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i)
  let candidate = fenceMatch?.[1] ?? trimmed

  const firstBrace = candidate.indexOf('{')
  const lastBrace = candidate.lastIndexOf('}')
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    candidate = candidate.slice(firstBrace, lastBrace + 1)
  }

  candidate = candidate.replace(/,\s*([}\]])/g, '$1')
  return candidate.trim()
}

function parseLooseText(raw: string): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  const keys = [
    'summary',
    'risk',
    'recoveryScore',
    'conditions',
    'medicines',
    'recommendations',
    'warnings',
    'followUp',
    'doctorAdvice',
    'confidence',
  ]

  for (const key of keys) {
    const regex = new RegExp(`${key}\\s*[:\-]\\s*([\\s\\S]*?)(?=\\n(?:${keys.join('|')})\\s*[:\-]|$)`, 'i')
    const match = raw.match(regex)
    if (!match) continue

    const value = match[1].trim()
    if (['conditions', 'medicines', 'recommendations', 'warnings'].includes(key)) {
      result[key] = parseStringArray(value)
    } else if (key === 'recoveryScore' || key === 'confidence') {
      const numeric = Number(value.replace(/[^\d]/g, ''))
      result[key] = Number.isFinite(numeric) ? numeric : undefined
    } else {
      result[key] = value.replace(/^"|"$/g, '').trim()
    }
  }

  return result
}

function normalizeAnalysisData(parsed: unknown): AnalysisData {
  const source = typeof parsed === 'object' && parsed !== null ? (parsed as Record<string, unknown>) : {}

  const summary = typeof source.summary === 'string' ? source.summary.trim() : ''
  const risk = normalizeRisk(source.risk)
  const confidence = clampPercentage(source.confidence)
  const recoveryScore = typeof source.recoveryScore === 'number'
    ? clampPercentage(source.recoveryScore)
    : confidence

  return {
    summary: summary || 'AI analysis could not extract a clear summary from the report.',
    risk,
    recoveryScore,
    conditions: parseStringArray(source.conditions),
    medicines: parseStringArray(source.medicines),
    recommendations: parseStringArray(source.recommendations),
    warnings: parseStringArray(source.warnings),
    followUp: typeof source.followUp === 'string' ? source.followUp.trim() : '',
    doctorAdvice: typeof source.doctorAdvice === 'string' ? source.doctorAdvice.trim() : '',
    confidence,
  }
}

function parseAnalysisJson(raw: string): { data: AnalysisData; valid: boolean } {
  let parsed: unknown = null
  let valid = false
  const cleanText = extractJsonLikeText(raw)

  try {
    parsed = JSON.parse(cleanText)
    valid = true
  } catch {
    try {
      parsed = JSON.parse(raw)
      valid = true
    } catch {
        parsed = parseLooseText(raw)
        valid = typeof parsed === 'object' && parsed !== null && Object.keys(parsed as Record<string, unknown>).length > 0
    }
  }

  const data = normalizeAnalysisData(parsed)
  if (!data.summary && data.conditions.length === 0 && data.medicines.length === 0) {
    valid = false
  }

  return { data, valid }
}

async function generateAnalysis(parts: AnalysisInputPart[]): Promise<AnalysisData> {
  const ai = getClient()
  let lastResponseText = ''
  let lastErrorText = ''

  for (let attempt = 1; attempt <= MAX_GENERATION_ATTEMPTS; attempt += 1) {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts,
        },
      ],
      config: {
        responseMimeType: 'application/json',
        temperature: 0,
      },
    })

    const responseText = response.text?.trim() ?? ''
    if (responseText) {
      lastResponseText = responseText
      const parsed = parseAnalysisJson(responseText)
      if (parsed.valid) {
        return parsed.data
      }
      lastErrorText = responseText
    }

    if (attempt < MAX_GENERATION_ATTEMPTS) {
      await delay(RETRY_DELAY_MS * attempt)
      if (attempt === 2 && lastResponseText) {
        parts = [
          {
            text: `${ANALYSIS_PROMPT}

The previous response was invalid. Reformat only the content below into valid JSON matching the required schema.

${lastResponseText}`,
          },
        ]
      }
    }
  }

  const reason = lastErrorText
    ? 'Gemini returned invalid or unparseable JSON after multiple attempts.'
    : 'Gemini returned an empty response after multiple attempts.'

  throw new Error(reason)
}

export async function analyzeTextWithGemini(text: string): Promise<AnalysisData> {
  return await generateAnalysis([
    {
      text: `${ANALYSIS_PROMPT}

Medical report text:
${text}`,
    },
  ])
}

export async function analyzeImageWithGemini(
  base64Data: string,
  mimeType: string
): Promise<{ analysis: AnalysisData; extractedText: string }> {
  const analysis = await generateAnalysis([
    {
      inlineData: {
        data: base64Data,
        mimeType,
      },
    },
    { text: ANALYSIS_PROMPT },
  ])

  return {
    analysis,
    extractedText: `[Image analysis via Gemini Vision: ${mimeType}]`,
  }
}
