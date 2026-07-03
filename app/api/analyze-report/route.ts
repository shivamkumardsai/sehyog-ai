import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionUser, unauthorizedResponse } from '@/lib/session'
import type { AnalysisData } from '@/lib/types/analysis'
import {
  validateFile,
  isPdfFile,
  isImageFile,
  normalizeMimeType,
} from '@/lib/file-validation'
import { extractTextFromPdf } from '@/lib/pdf-extract'
import { analyzeTextWithGemini, analyzeImageWithGemini } from '../../../lib/gemini'
import { analysisResultToData, stringifyArray } from '@/lib/analysis-utils'

export const maxDuration = 60

export async function POST(request: NextRequest) {
  let reportId: string | null = null

  try {
    // Ensure required env is present for production
    if (!process.env.DATABASE_URL) {
      console.error('Missing DATABASE_URL')
      return NextResponse.json({ error: 'DATABASE_URL is not configured on the server.' }, { status: 503 })
    }
    const user = await getSessionUser()
    if (!user?.id) {
      return unauthorizedResponse()
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured on the server.' },
        { status: 503 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file')

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: 'No file uploaded. Please send a file under the "file" field.' },
        { status: 400 }
      )
    }

    const validation = validateFile(file)
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    const mimeType = normalizeMimeType(file)
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    let report
    try {
      report = await prisma.medicalReport.create({
      data: {
        userId: user.id,
        fileName: file.name,
        fileType: mimeType,
        fileSize: file.size,
        status: 'PROCESSING',
      },
      })
    } catch (dbErr) {
      console.error('DB create report failed:', dbErr)
      return NextResponse.json({ error: 'Failed to create report record.' }, { status: 500 })
    }
    reportId = report.id

    try {
      await prisma.uploadHistory.create({
      data: {
        reportId: report.id,
        action: 'UPLOAD',
        status: 'PROCESSING',
      },
      })
    } catch (dbErr) {
      console.error('DB create uploadHistory failed:', dbErr)
    }

    let extractedText = ''
    let analysis

    if (isPdfFile(file)) {
      try {
        extractedText = await extractTextFromPdf(buffer)
      } catch (pdfError) {
        const message =
          pdfError instanceof Error
            ? pdfError.message
            : 'Failed to extract text from PDF.'
        await markReportFailed(report.id, message)
        return NextResponse.json({ error: message }, { status: 422 })
      }

      try {
        analysis = await analyzeTextWithGemini(extractedText)
      } catch (aiErr) {
        console.error('Gemini analysis failed:', aiErr)
        const message = aiErr instanceof Error ? aiErr.message : 'AI analysis failed.'
        await markReportFailed(report.id, message)
        return NextResponse.json({ error: message }, { status: 502 })
      }
    } else if (isImageFile(file)) {
      const base64Data = buffer.toString('base64')
      const result = await analyzeImageWithGemini(base64Data, mimeType)
      analysis = result.analysis
      extractedText = result.extractedText
    } else {
      await markReportFailed(report.id, 'Unsupported file type.')
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload PDF, JPG, JPEG, PNG, or WEBP.' },
        { status: 400 }
      )
    }

    let savedAnalysis
    try {
      savedAnalysis = await prisma.analysisResult.create({
        data: {
          reportId: report.id,
          summary: analysis.summary,
          risk: analysis.risk,
          recoveryScore: analysis.recoveryScore,
          conditions: stringifyArray(analysis.conditions),
          medicines: stringifyArray(analysis.medicines),
          recommendations: stringifyArray(analysis.recommendations),
          warnings: stringifyArray(analysis.warnings),
          followUp: analysis.followUp,
          doctorAdvice: analysis.doctorAdvice,
          confidence: analysis.confidence,
          rawResponse: JSON.stringify(analysis),
        },
      })
    } catch (dbErr) {
      console.error('DB create analysisResult failed:', dbErr)
      await markReportFailed(report.id, 'Failed to save analysis result')
      return NextResponse.json({ error: 'Failed to save analysis result.' }, { status: 500 })
    }

    try {
      await prisma.medicalReport.update({
        where: { id: report.id },
        data: {
          extractedText,
          status: 'COMPLETED',
        },
      })
    } catch (dbErr) {
      console.error('DB update medicalReport failed:', dbErr)
    }

    try {
      await prisma.uploadHistory.update({
        where: { reportId: report.id },
        data: { status: 'COMPLETED' },
      })
    } catch (dbErr) {
      console.error('DB update uploadHistory failed:', dbErr)
    }

    if (analysis.medicines.length > 0) {
      try {
        await prisma.medicine.createMany({
          data: analysis.medicines.map((name) => ({
            userId: user.id,
            name,
            source: report.fileName,
          })),
        })
      } catch (dbErr) {
        console.error('DB createMany medicines failed:', dbErr)
      }
    }

    const payload = analysisResultToData(savedAnalysis, {
      fileName: file.name,
      reportId: report.id,
    })

    return NextResponse.json(payload, { status: 200 })
  } catch (error) {
    console.error('Analyze report error:', error)

    if (reportId) {
      const message =
        error instanceof Error ? error.message : 'Unable to process the report upload.'
      await markReportFailed(reportId, message).catch(console.error)
    }

    const message =
      error instanceof Error ? error.message : 'Unable to process the report upload.'

    const status = getStatusFromError(message)

    return NextResponse.json({ error: message }, { status })
  }
}

function getStatusFromError(message: string) {
  const normalized = message.toLowerCase()

  if (normalized.includes('gemini_api_key') || normalized.includes('gemini api key')) {
    return 503
  }

  if (/(timeout|timed out)/i.test(message)) {
    return 504
  }

  if (/(invalid or unparseable json|invalid json|empty response|could not parse|response parsing issue)/i.test(message)) {
    return 502
  }

  return 500
}

async function markReportFailed(reportId: string, message: string) {
  await prisma.medicalReport.update({
    where: { id: reportId },
    data: { status: 'FAILED', extractedText: message },
  })

  await prisma.uploadHistory.updateMany({
    where: { reportId },
    data: { status: 'FAILED' },
  })
}
