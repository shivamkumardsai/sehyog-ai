export interface AnalysisData {
  id?: string
  reportId?: string
  summary: string
  risk: string
  recoveryScore: number
  conditions: string[]
  medicines: string[]
  recommendations: string[]
  warnings: string[]
  followUp: string
  doctorAdvice: string
  confidence: number
  fileName?: string
  createdAt?: string
}

export interface DashboardStats {
  totalReports: number
  pendingAnalysis: number
  completedReports: number
  recentUploads: {
    id: string
    fileName: string
    status: string
    createdAt: string
  }[]
  riskStats: {
    low: number
    medium: number
    high: number
    unknown: number
  }
  latestAnalysis: AnalysisData | null
}

export const ANALYSIS_JSON_SCHEMA = {
  summary: '',
  risk: '',
  recoveryScore: 0,
  conditions: [] as string[],
  medicines: [] as string[],
  recommendations: [] as string[],
  warnings: [] as string[],
  followUp: '',
  doctorAdvice: '',
  confidence: 95,
}
