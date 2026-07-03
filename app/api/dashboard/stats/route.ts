import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionUser, unauthorizedResponse } from '@/lib/session'
import { analysisResultToData, classifyRisk } from '@/lib/analysis-utils'

// Removed server-side in-memory cache to avoid stale data on serverless platforms (Vercel).

export async function GET() {
  try {
    const user = await getSessionUser()
    if (!user?.id) {
      return unauthorizedResponse()
    }
    // Always fetch fresh data from DB on each request (serverless-safe)

    const totalReports = await prisma.medicalReport.count({ where: { userId: user.id } })
    const pendingAnalysis = await prisma.medicalReport.count({
      where: { userId: user.id, status: { in: ['PENDING', 'PROCESSING'] } },
    })
    const completedReports = await prisma.medicalReport.count({
      where: { userId: user.id, status: 'COMPLETED' },
    })
    const recentReports = await prisma.medicalReport.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
    })
    const analyses = await prisma.analysisResult.findMany({
      where: { report: { userId: user.id } },
      include: { report: true },
      orderBy: { createdAt: 'desc' },
    }) as Array<{
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
      report?: { fileName: string } | null
    }>

    const riskStats = { low: 0, medium: 0, high: 0, unknown: 0 }
    for (const analysis of analyses) {
      const bucket = classifyRisk(analysis.risk)
      riskStats[bucket] += 1
    }

    const latest = analyses[0] && analyses[0].report
      ? analysisResultToData(analyses[0], {
          fileName: analyses[0].report.fileName,
          reportId: analyses[0].reportId,
        })
      : null

    const payload = {
      totalReports,
      pendingAnalysis,
      completedReports,
      recentUploads: recentReports.map((report) => ({
        id: report.id,
        fileName: report.fileName,
        status: report.status,
        createdAt: report.createdAt.toISOString(),
      })),
      riskStats,
      latestAnalysis: latest,
    }


    return NextResponse.json(payload)
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Failed to load dashboard statistics.' },
      { status: 500 }
    )
  }
}
