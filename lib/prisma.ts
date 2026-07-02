type MedicalReportStatus = 'PROCESSING' | 'PENDING' | 'COMPLETED' | 'FAILED'

export interface MedicalReportRecord {
  id: string
  userId: string
  fileName: string
  fileType: string
  fileSize: number
  status: MedicalReportStatus
  extractedText?: string
  createdAt: Date
}

interface UploadHistoryRecord {
  id: string
  reportId: string
  action: string
  status: MedicalReportStatus
  createdAt: Date
}

export interface AnalysisResultRecord {
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

interface MedicineRecord {
  id: string
  userId: string
  name: string
  source: string
  createdAt: Date
}

export type MedicalReportWithAnalysis = MedicalReportRecord & {
  analysis: AnalysisResultRecord | null
}

export type AnalysisResultWithReport = AnalysisResultRecord & {
  report: MedicalReportRecord | null
}

const db = {
  medicalReports: [] as MedicalReportRecord[],
  uploadHistories: [] as UploadHistoryRecord[],
  analysisResults: [] as AnalysisResultRecord[],
  medicines: [] as MedicineRecord[],
}

function generateId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`
}

function sortByDateDesc<T extends { createdAt: Date }>(items: T[]) {
  return [...items].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

type Primitive = string | number | boolean | null | undefined

type FilterValue =
  | Primitive
  | { in: Primitive[] }
  | { equals: Primitive }
  | Record<string, unknown>

type WhereFilter = Record<string, FilterValue>

type UnknownRecord = { [key: string]: unknown }

function matchesFilter(record: unknown, where: WhereFilter): boolean {
  const item = record as UnknownRecord
  return Object.entries(where).every(([key, value]) => {
    const field = item[key]
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      if ('in' in value && Array.isArray(value.in)) {
        return value.in.includes(field as Primitive)
      }
      if ('equals' in value) {
        return field === value.equals
      }
      if (typeof field === 'object' && field !== null) {
        return matchesFilter(field as Record<string, unknown>, value as WhereFilter)
      }
      return false
    }
    return field === value
  })
}

const prisma = {
  medicalReport: {
    async create({ data }: { data: Omit<MedicalReportRecord, 'id' | 'createdAt'> }): Promise<MedicalReportRecord> {
      const record: MedicalReportRecord = {
        id: generateId('report'),
        createdAt: new Date(),
        ...data,
      }
      db.medicalReports.push(record)
      return record
    },
    async update({ where, data }: { where: { id: string }; data: Partial<MedicalReportRecord> }): Promise<MedicalReportRecord> {
      const record = db.medicalReports.find((item) => item.id === where.id)
      if (!record) {
        throw new Error('Medical report not found')
      }
      Object.assign(record, data)
      return record
    },
    async findMany({
      where = {},
      include,
      orderBy,
      take,
    }: {
      where?: WhereFilter
      include?: { analysis?: boolean }
      orderBy?: { createdAt: 'desc' | 'asc' }
      take?: number
    } = {}): Promise<MedicalReportWithAnalysis[]> {
      let results = db.medicalReports.filter((item) => matchesFilter(item, where))
      if (orderBy?.createdAt === 'desc') {
        results = sortByDateDesc(results)
      }
      if (typeof take === 'number') {
        results = results.slice(0, take)
      }
      return results.map((item) => ({
        ...item,
        analysis: include?.analysis
          ? db.analysisResults.find((analysis) => analysis.reportId === item.id) ?? null
          : null,
      }))
    },
    async findFirst({
      where = {},
      include,
    }: {
      where?: WhereFilter
      include?: { analysis?: boolean }
    } = {}): Promise<MedicalReportWithAnalysis | null> {
      const report = db.medicalReports.find((item) => matchesFilter(item, where))
      if (!report) {
        return null
      }
      return {
        ...report,
        analysis: include?.analysis
          ? db.analysisResults.find((analysis) => analysis.reportId === report.id) ?? null
          : null,
      }
    },
    async count({ where = {} }: { where?: WhereFilter }): Promise<number> {
      return db.medicalReports.filter((item) => matchesFilter(item, where)).length
    },
  },
  uploadHistory: {
    async create({ data }: { data: Omit<UploadHistoryRecord, 'id' | 'createdAt'> }): Promise<UploadHistoryRecord> {
      const record: UploadHistoryRecord = {
        id: generateId('upload'),
        createdAt: new Date(),
        ...data,
      }
      db.uploadHistories.push(record)
      return record
    },
    async update({ where, data }: { where: { reportId: string }; data: Partial<UploadHistoryRecord> }): Promise<UploadHistoryRecord> {
      const record = db.uploadHistories.find((item) => item.reportId === where.reportId)
      if (!record) {
        throw new Error('Upload history not found')
      }
      Object.assign(record, data)
      return record
    },
    async updateMany({
      where,
      data,
    }: {
      where: Partial<UploadHistoryRecord>
      data: Partial<UploadHistoryRecord>
    }): Promise<{ count: number }> {
      const records = db.uploadHistories.filter((item) =>
        Object.entries(where).every(
          ([key, value]) => ((item as unknown) as UnknownRecord)[key] === value
        )
      )
      records.forEach((record) => Object.assign(record, data))
      return { count: records.length }
    },
  },
  analysisResult: {
    async create({ data }: { data: Omit<AnalysisResultRecord, 'id' | 'createdAt'> }): Promise<AnalysisResultRecord> {
      const record: AnalysisResultRecord = {
        id: generateId('analysis'),
        createdAt: new Date(),
        ...data,
      }
      db.analysisResults.push(record)
      return record
    },
    async findMany({
      where,
      include,
      orderBy,
    }: {
      where?: { report?: { userId: string } }
      include?: { report?: boolean }
      orderBy?: { createdAt: 'desc' | 'asc' }
    } = {}): Promise<AnalysisResultWithReport[]> {
      let results = db.analysisResults
      if (where?.report?.userId) {
        const userId = where.report.userId
        results = results.filter((item) => {
          const report = db.medicalReports.find((reportItem) => reportItem.id === item.reportId)
          return report?.userId === userId
        })
      }
      if (orderBy?.createdAt === 'desc') {
        results = sortByDateDesc(results)
      }
      if (include?.report) {
        return results.map((item) => ({
          ...item,
          report: db.medicalReports.find((reportItem) => reportItem.id === item.reportId) ?? null,
        }))
      }
      return results.map((item) => ({ ...item, report: null }))
    },
  },
  medicine: {
    async createMany({ data }: { data: Omit<MedicineRecord, 'id' | 'createdAt'>[] }): Promise<{ count: number }> {
      const records = data.map((item) => {
        const record: MedicineRecord = {
          id: generateId('medicine'),
          createdAt: new Date(),
          ...item,
        }
        db.medicines.push(record)
        return record
      })
      return { count: records.length }
    },
  },
}

export { prisma }
