import type { AnalysisData } from '@/lib/types/analysis'

interface AnalysisResultRecord {
  id: string
  reportId: string
  summary: string
  risk: string
  recoveryScore: number
  conditions: string
  medicines: string
  recommendations: string
  warnings: string
  followUp: string
  doctorAdvice: string
  confidence: number
  rawResponse: string
  createdAt: Date
}

export function parseJsonArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === 'string')
      : []
  } catch {
    return []
  }
}

export function stringifyArray(value: string[]): string {
  return JSON.stringify(value)
}

export function analysisResultToData(
  result: AnalysisResultRecord,
  extras?: { fileName?: string; reportId?: string }
): AnalysisData {
  return {
    id: result.id,
    reportId: result.reportId,
    summary: result.summary,
    risk: result.risk,
    recoveryScore: result.recoveryScore,
    conditions: parseJsonArray(result.conditions),
    medicines: parseJsonArray(result.medicines),
    recommendations: parseJsonArray(result.recommendations),
    warnings: parseJsonArray(result.warnings),
    followUp: result.followUp,
    doctorAdvice: result.doctorAdvice,
    confidence: result.confidence,
    fileName: extras?.fileName,
    createdAt: result.createdAt.toISOString(),
  }
}

export function classifyRisk(risk: string): 'low' | 'medium' | 'high' | 'unknown' {
  const normalized = risk.toLowerCase()
  if (normalized.includes('high')) return 'high'
  if (normalized.includes('medium') || normalized.includes('moderate')) return 'medium'
  if (normalized.includes('low')) return 'low'
  return 'unknown'
}
