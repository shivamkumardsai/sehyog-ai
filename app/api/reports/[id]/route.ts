import { NextResponse } from 'next/server'
import { prisma, type MedicalReportWithAnalysis } from '@/lib/prisma'
import { getSessionUser, unauthorizedResponse } from '@/lib/session'
import { analysisResultToData } from '@/lib/analysis-utils'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser()
    if (!user?.id) {
      return unauthorizedResponse()
    }

    const { id } = await params

    const report = await prisma.medicalReport.findFirst({
      where: { id, userId: user.id },
      include: { analysis: true },
    })

    if (!report) {
      return NextResponse.json({ error: 'Report not found.' }, { status: 404 })
    }

    if (!report.analysis) {
      return NextResponse.json({ error: 'Analysis not found for this report.' }, { status: 404 })
    }

    return NextResponse.json(
      analysisResultToData(report.analysis, {
        fileName: report.fileName,
        reportId: report.id,
      })
    )
  } catch (error) {
    console.error('Report detail error:', error)
    return NextResponse.json({ error: 'Failed to load report.' }, { status: 500 })
  }
}
