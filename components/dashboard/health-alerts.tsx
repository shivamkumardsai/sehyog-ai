import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, CheckCircle } from 'lucide-react'

export function HealthAlerts() {
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
          <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-6 rounded-xl border border-green-200 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-900">No Critical Alerts</p>
              <p className="text-sm text-green-800 mt-1">
                Patient&apos;s vital signs are within normal range. Recovery is on track.
              </p>
            </div>
          </div>

          {/* Status indicators */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Blood Pressure</p>
              <p className="font-semibold text-foreground">120/80</p>
              <p className="text-xs text-green-600 mt-1">Normal</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Heart Rate</p>
              <p className="font-semibold text-foreground">72 bpm</p>
              <p className="text-xs text-green-600 mt-1">Normal</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
