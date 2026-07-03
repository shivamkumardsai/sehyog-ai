import { NextResponse } from 'next/server'
import { prisma, checkDbConnection } from '@/lib/prisma'

export async function GET() {
  try {
    const dbOk = await checkDbConnection()
    const reportCount = await prisma.medicalReport.count()
    const analysisCount = await prisma.analysisResult.count()

    return NextResponse.json({ ok: true, dbOk, reportCount, analysisCount })
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json({ ok: false, error: (error instanceof Error) ? error.message : String(error) }, { status: 500 })
  }
}
