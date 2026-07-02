'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import { useLatestAnalysis } from '@/components/providers/dashboard-data-provider'

export function AIRiskAnalysis() {
  const analysis = useLatestAnalysis()

  const recoveryScore = analysis?.recoveryScore ?? 0
  const risk = analysis?.risk ?? 'Unknown'
  const confidence = analysis?.confidence ?? 0
  const riskFactors = analysis?.warnings?.length
    ? analysis.warnings
    : analysis?.recommendations?.length
      ? analysis.recommendations.slice(0, 5)
      : ['Upload a report to generate AI risk analysis.']

  const riskColor =
    risk.toLowerCase().includes('high')
      ? 'bg-red-500'
      : risk.toLowerCase().includes('medium') || risk.toLowerCase().includes('moderate')
        ? 'bg-yellow-500'
        : 'bg-green-500'

  const progressColor =
    recoveryScore >= 70 ? '#10b981' : recoveryScore >= 40 ? '#f59e0b' : '#ef4444'

  return (
    <Card className="bg-white border-border">
      <CardHeader>
        <CardTitle>AI Risk Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center gap-8">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="55" fill="none" stroke="#e2e8f0" strokeWidth="8" />
              <circle
                cx="60"
                cy="60"
                r="55"
                fill="none"
                stroke={progressColor}
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 55 * (recoveryScore / 100)} ${2 * Math.PI * 55}`}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold text-accent">{recoveryScore}%</p>
              <p className="text-xs text-muted-foreground">Recovery Score</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current Risk</p>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${riskColor}`} />
                <p className="text-lg font-bold text-foreground uppercase">{risk}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">AI Confidence</p>
              <p className="text-lg font-bold text-primary">{confidence}%</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-accent/5 to-primary/5 p-4 rounded-lg border border-accent/20">
          <p className="text-sm font-semibold text-foreground mb-3">Key Insights</p>
          <ul className="space-y-2">
            {riskFactors.map((factor, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm text-foreground">{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
