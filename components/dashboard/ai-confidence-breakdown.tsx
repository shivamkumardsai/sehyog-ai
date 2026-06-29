'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function AIConfidenceBreakdown() {
  const metrics = [
    { label: 'Medicine Adherence', percentage: 95, color: 'from-accent to-accent/70' },
    { label: 'Pain Reduction', percentage: 88, color: 'from-blue-500 to-blue-600' },
    { label: 'Mobility', percentage: 80, color: 'from-purple-500 to-purple-600' },
    { label: 'Sleep Quality', percentage: 76, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Vitals Stability', percentage: 92, color: 'from-emerald-500 to-emerald-600' },
  ]

  return (
    <Card className="bg-white border-border">
      <CardHeader>
        <CardTitle>Why did AI predict Low Risk?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress bars */}
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">
                  {metric.label}
                </label>
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

        {/* Explanation */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-4 rounded-lg border border-primary/20">
          <p className="text-sm text-foreground leading-relaxed">
            The AI reached this prediction using recovery trends, medicine adherence, symptoms,
            and uploaded medical reports.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
