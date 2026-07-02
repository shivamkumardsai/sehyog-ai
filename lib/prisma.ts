import { PrismaClient, type Prisma } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export type MedicalReportWithAnalysis = Prisma.MedicalReportGetPayload<{
  include: { analysis: true }
}>

export type AnalysisResultWithReport = Prisma.AnalysisResultGetPayload<{
  include: { report: true }
}>
