'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLatestAnalysis } from '@/components/providers/dashboard-data-provider'

export function AIConfidenceBreakdown() {
  const analysis = useLatestAnalysis()

  const base = analysis?.confidence ?? 0
  const recovery = analysis?.recoveryScore ?? 0

  const metrics = [
    { label: 'Medicine Extraction', percentage: Math.min(100, base), color: 'from-accent to-accent/70' },
    { label: 'Risk Assessment', percentage: Math.min(100, Math.round((base + recovery) / 2)), color: 'from-blue-500 to-blue-600' },
    { label: 'Recovery Outlook', percentage: recovery, color: 'from-purple-500 to-purple-600' },
    { label: 'Condition Detection', percentage: Math.min(100, (analysis?.conditions.length ?? 0) * 20 + 40), color: 'from-yellow-500 to-yellow-600' },
    { label: 'Overall Confidence', percentage: base, color: 'from-emerald-500 to-emerald-600' },
  ]

  return (
    <Card className="bg-white border-border">
      <CardHeader>
        <CardTitle>AI Confidence Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">{metric.label}</label>
                <span className="text-sm font-bold text-primary">{metric.percentage}%</span>
              </div>
              <div className="w-full bg-muted h-3 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${metric.color}`}
                  style={{ width: `${metric.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-4 rounded-lg border border-primary/20">
          <p className="text-sm text-foreground leading-relaxed">
            {analysis?.summary ||
              'Confidence scores are generated after you upload and analyze a medical report.'}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
