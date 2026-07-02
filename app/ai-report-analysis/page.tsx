'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Share2,
  Volume2,
  Copy,
  Pill,
  Calendar,
  Shield,
  Brain,
  ArrowRight,
  Zap,
} from 'lucide-react'
import type { AnalysisData } from '@/lib/types/analysis'
import { showToasts } from '@/lib/toast-utils'

export default function AIReportAnalysisPage() {
  const [data, setData] = useState<AnalysisData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAnalysis() {
      try {
        const stored = localStorage.getItem('medicalAnalysis')
        if (stored) {
          setData(JSON.parse(stored) as AnalysisData)
          setLoading(false)
          return
        }

        const response = await fetch('/api/dashboard/stats')
        const stats = await response.json()
        if (response.ok && stats.latestAnalysis) {
          setData(stats.latestAnalysis)
          localStorage.setItem('medicalAnalysis', JSON.stringify(stats.latestAnalysis))
        }
      } catch (err) {
        console.error('Failed to load analysis:', err)
        showToasts.error('Load failed', 'Could not load your analysis report.')
      } finally {
        setLoading(false)
      }
    }

    loadAnalysis()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">Loading your AI Analysis Report...</p>
        </div>
      </main>
    )
  }

  const hasData = Boolean(data?.summary)
  const reportData: AnalysisData = data ?? {
    summary: '',
    risk: 'Unknown',
    recoveryScore: 0,
    conditions: [],
    medicines: [],
    recommendations: [],
    warnings: [],
    followUp: '',
    doctorAdvice: '',
    confidence: 0,
  }

  const warnings = reportData.warnings?.length
    ? reportData.warnings
    : reportData.recommendations

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your AI Analysis Report
          </h1>
          <p className="text-lg text-muted-foreground">
            {hasData
              ? 'Based on your uploaded medical records'
              : 'Upload a report from the dashboard to generate your analysis'}
          </p>
        </div>

        {!hasData && (
          <div className="mb-12 p-6 bg-yellow-50 border border-yellow-200 rounded-2xl text-center">
            <p className="text-yellow-900 font-medium mb-4">
              No analysis found. Upload a medical report to get started.
            </p>
            <Link href="/Medical-report-upload">
              <Button>Upload Medical Report</Button>
            </Link>
          </div>
        )}

        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-border rounded-2xl p-4 sm:p-8 text-center">
              <div className="text-6xl font-bold text-primary mb-2">
                {hasData ? `${reportData.recoveryScore}%` : '—'}
              </div>
              <p className="text-muted-foreground">Recovery Score</p>
            </div>
            <div className="bg-white border border-border rounded-2xl p-4 sm:p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-8 h-8 text-accent" />
                <span className="text-3xl font-bold text-accent capitalize">
                  {reportData.risk || 'Unknown'}
                </span>
              </div>
              <p className="text-muted-foreground">Current Risk Status</p>
            </div>
            <div className="bg-white border border-border rounded-2xl p-4 sm:p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Brain className="w-8 h-8 text-primary" />
                <span className="text-3xl font-bold text-primary">
                  {hasData ? `${reportData.confidence}%` : '—'}
                </span>
              </div>
              <p className="text-muted-foreground">AI Confidence</p>
            </div>
          </div>
        </div>

        <div className="mb-12 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-4 sm:p-8">
          <div className="flex items-start gap-4">
            <Zap className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">AI Summary</h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>{reportData.summary || 'No summary available yet.'}</p>
                {reportData.doctorAdvice && (
                  <div className="mt-4 pt-4 border-t border-primary/10">
                    <p className="font-semibold text-primary mb-1">Doctor Advice:</p>
                    <p className="italic text-muted-foreground">{reportData.doctorAdvice}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white border border-border rounded-2xl p-4 sm:p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-primary" />
              Detected Conditions
            </h3>
            <div className="space-y-4">
              {reportData.conditions.length > 0 ? (
                reportData.conditions.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <p className="font-semibold text-foreground">{item}</p>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                      Identified
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No conditions detected in this report.</p>
              )}
            </div>
          </div>

          <div className="bg-white border border-border rounded-2xl p-4 sm:p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Pill className="w-6 h-6 text-primary" />
              Prescribed Medicines
            </h3>
            <div className="space-y-4">
              {reportData.medicines.length > 0 ? (
                <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10">
                  <p className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Extracted Treatment Plan
                  </p>
                  <ul className="space-y-2">
                    {reportData.medicines.map((med, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-accent flex-shrink-0" />
                        <span>{med}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No medicines detected in this report.</p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-12 bg-white border border-border rounded-2xl p-4 sm:p-8">
          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-destructive" />
            Recommendations & Warnings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {warnings.length > 0 ? (
              warnings.map((warning, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 bg-destructive/5 rounded-lg border border-destructive/10"
                >
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-foreground text-sm">{warning}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground col-span-2">
                No warnings or recommendations generated.
              </p>
            )}
          </div>
        </div>

        <div className="mb-12 bg-gradient-to-br from-blue-50 to-primary/5 border border-primary/20 rounded-2xl p-4 sm:p-8">
          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            Follow-up
          </h3>
          <div className="p-4 bg-white/80 rounded-xl border border-primary/10">
            <p className="font-bold text-foreground text-base md:text-lg">
              {reportData.followUp || 'Follow your doctor\'s instructions.'}
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Explain Report</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: <Copy className="w-5 h-5" />, label: 'Explain in Hindi', color: 'bg-blue-50 hover:bg-blue-100 text-primary border-blue-200' },
              { icon: <Volume2 className="w-5 h-5" />, label: 'Explain Simply', color: 'bg-green-50 hover:bg-green-100 text-accent border-green-200' },
              { icon: <Volume2 className="w-5 h-5" />, label: 'Read Aloud', color: 'bg-purple-50 hover:bg-purple-100 text-purple-600 border-purple-200' },
            ].map((btn, i) => (
              <Button
                key={i}
                variant="outline"
                className={`h-14 rounded-xl border-2 ${btn.color} font-semibold transition`}
              >
                {btn.icon}
                <span className="ml-2">{btn.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-border rounded-2xl p-4 sm:p-8 mb-12">
          <h3 className="text-xl font-bold text-foreground mb-6">Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-12 rounded-xl border-2">
              <Download className="mr-2 w-4 h-4" />
              Download Summary PDF
            </Button>
            <Button variant="outline" className="h-12 rounded-xl border-2">
              <Share2 className="mr-2 w-4 h-4" />
              Share with Family
            </Button>
            <Link href="/dashboard">
              <Button className="h-12 rounded-xl w-full bg-primary hover:bg-primary/90">
                Continue to Recovery Tracker
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="text-center">
          <Link href="/dashboard">
            <Button size="lg" className="bg-accent hover:bg-accent/90 h-12 px-8 rounded-xl">
              Back to Dashboard
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
