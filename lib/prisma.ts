import { PrismaClient } from '@prisma/client'

const DATABASE_URL = process.env.DATABASE_URL || ''

function maskConnectionString(rawUrl: string) {
  try {
    const url = new URL(rawUrl)
    if (url.password) {
      url.password = '*****'
    }
    return url.toString()
  } catch {
    return rawUrl
  }
}

function logPrismaStartup() {
  const url = DATABASE_URL ? maskConnectionString(DATABASE_URL) : 'not set'
  let database = 'unknown'
  let host = 'unknown'
  try {
    const parsed = new URL(DATABASE_URL)
    database = parsed.pathname?.replace(/^\//, '') || database
    host = parsed.host || host
  } catch {
    // ignore
  }

  console.info('[Prisma Startup] Node version:', process.version)
  console.info('[Prisma Startup] Prisma client package:', require('@prisma/client/package.json').version)
  console.info('[Prisma Startup] Database URL:', url)
  console.info('[Prisma Startup] Database:', database)
  console.info('[Prisma Startup] Atlas host:', host)
  console.info('[Prisma Startup] Hostname:', require('os').hostname())
}

logPrismaStartup()

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export type MedicalReportWithAnalysis = Awaited<ReturnType<typeof prisma.medicalReport.findMany>>[number]
export type AnalysisResultWithReport = Awaited<ReturnType<typeof prisma.analysisResult.findMany>>[number]

export async function checkDbConnection(): Promise<boolean> {
  try {
    await prisma.$runCommandRaw({ ping: 1 })
    return true
  } catch (error) {
    console.error('DB connection check failed:', error)
    return false
  }
}
