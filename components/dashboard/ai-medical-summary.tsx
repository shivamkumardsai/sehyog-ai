'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, TrendingUp } from 'lucide-react'
import { useLatestAnalysis, useDashboardData } from '@/components/providers/dashboard-data-provider'
import { useMemo } from 'react'

export function AIMedicalSummary() {
  const analysis = useLatestAnalysis()
  const { loading } = useDashboardData()

  const conditions = useMemo(() => (analysis?.conditions ?? []), [analysis])
  const doctorAdvice = useMemo(
    () => (analysis?.doctorAdvice ? [analysis.doctorAdvice] : analysis?.recommendations?.slice(0, 3) ?? []),
    [analysis]
  )
  const primaryWarning = analysis?.warnings?.[0]

  return (
    <Card className="bg-white border-border">
      <CardHeader>
        <CardTitle>AI Medical Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {conditions.length > 0 ? (
            conditions.slice(0, 4).map((condition, index) => (
              <div key={index} className="bg-muted/30 p-4 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground mb-2">Condition</p>
                <p className="text-sm font-bold text-foreground">{condition}</p>
                <span className="text-xs font-semibold px-2 py-1 rounded bg-primary/10 text-primary mt-2 inline-block">
                  Detected
                </span>
              </div>
            ))
          ) : (
            <div className="col-span-full p-4 bg-muted/30 rounded-lg border border-border text-sm text-muted-foreground">
              Upload a report to see detected conditions and vitals summary.
            </div>
          )}
        </div>

        {doctorAdvice.length > 0 && (
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-4 rounded-lg border border-primary/20">
            <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Doctor Advice
            </p>
            <ul className="space-y-2">
              {doctorAdvice.map((advice, index) => (
                <li key={index} className="text-sm text-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {advice}
                </li>
              ))}
            </ul>
          </div>
        )}

        {primaryWarning && (
          <div className="flex gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-yellow-900">Clinical Warning</p>
              <p className="text-xs text-yellow-800 mt-1">{primaryWarning}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
