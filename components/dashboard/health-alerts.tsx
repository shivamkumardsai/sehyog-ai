'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { useDashboardData } from '@/components/providers/dashboard-data-provider'
import { useLatestAnalysis } from '@/components/providers/dashboard-data-provider'

export function HealthAlerts() {
  const { stats } = useDashboardData()
  const analysis = useLatestAnalysis()
  const warnings = analysis?.warnings ?? []
  const hasCritical = warnings.length > 0

  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-primary" />
          Health Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!hasCritical ? (
            <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-6 rounded-xl border border-green-200 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900">No Critical Alerts</p>
                <p className="text-sm text-green-800 mt-1">
                  {analysis?.summary || 'Upload a report to receive personalized health alerts.'}
                </p>
              </div>
            </div>
          ) : (
            warnings.map((warning, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-xl border border-red-200 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{warning}</p>
              </div>
            ))
          )}

          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Total Reports</p>
              <p className="font-semibold text-foreground">{stats?.totalReports ?? 0}</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Completed</p>
              <p className="font-semibold text-foreground">{stats?.completedReports ?? 0}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
