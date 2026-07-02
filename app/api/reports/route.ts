import { NextResponse } from 'next/server'
import { prisma, type MedicalReportWithAnalysis } from '@/lib/prisma'
import { getSessionUser, unauthorizedResponse } from '@/lib/session'
import { analysisResultToData } from '@/lib/analysis-utils'

export async function GET() {
  try {
    const user = await getSessionUser()
    if (!user?.id) {
      return unauthorizedResponse()
    }

    const reports = await prisma.medicalReport.findMany({
      where: { userId: user.id },
      include: { analysis: true },
      orderBy: { createdAt: 'desc' },
      take: 20,
    })

    return NextResponse.json(
      reports.map((report: MedicalReportWithAnalysis) => ({
        id: report.id,
        fileName: report.fileName,
        fileType: report.fileType,
        fileSize: report.fileSize,
        status: report.status,
        createdAt: report.createdAt.toISOString(),
        analysis: report.analysis
          ? analysisResultToData(report.analysis, {
              fileName: report.fileName,
              reportId: report.id,
            })
          : null,
      }))
    )
  } catch (error) {
    console.error('Reports list error:', error)
    return NextResponse.json({ error: 'Failed to load reports.' }, { status: 500 })
  }
}
