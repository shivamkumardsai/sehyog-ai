'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLatestAnalysis } from '@/components/providers/dashboard-data-provider'

export function UpcomingAppointment() {
  const analysis = useLatestAnalysis()
  const followUp = analysis?.followUp

  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Follow-up Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-6 rounded-xl border border-primary/20">
          {followUp ? (
            <>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-1">From latest report</p>
                <p className="text-base font-bold text-foreground">{followUp}</p>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold">AI-extracted follow-up guidance</span>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Upload a medical report to see follow-up instructions extracted by AI.
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="w-full" disabled={!followUp}>
            Reschedule
          </Button>
          <Button className="w-full bg-primary hover:bg-primary/90" disabled={!followUp}>
            Confirm
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
