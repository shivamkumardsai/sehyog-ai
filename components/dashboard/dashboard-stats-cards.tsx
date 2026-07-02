'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react'
import { useMemo } from 'react'
import { useDashboardData } from '@/components/providers/dashboard-data-provider'

export function DashboardStatsCards() {
  const { stats, loading } = useDashboardData()

  const cards = useMemo(
    () => [
      {
        label: 'Total Reports',
        value: stats?.totalReports ?? 0,
        icon: FileText,
        color: 'text-primary',
      },
      {
        label: 'Pending Analysis',
        value: stats?.pendingAnalysis ?? 0,
        icon: Clock,
        color: 'text-yellow-600',
      },
      {
        label: 'Completed',
        value: stats?.completedReports ?? 0,
        icon: CheckCircle,
        color: 'text-green-600',
      },
      {
        label: 'High Risk Reports',
        value: stats?.riskStats.high ?? 0,
        icon: AlertTriangle,
        color: 'text-red-600',
      },
    ],
    [stats]
  )

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <Card key={card.label} className="border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Icon className={`w-4 h-4 ${card.color}`} />
                {card.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">
                {loading ? '—' : card.value}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
