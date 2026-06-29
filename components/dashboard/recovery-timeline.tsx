'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Hospital,
  Pill,
  TrendingDown,
  Footprints,
  CheckCircle2,
  Activity,
} from 'lucide-react'

export function RecoveryTimeline() {
  const timelineEvents = [
    {
      day: 1,
      title: 'Hospital Discharge',
      icon: Hospital,
      color: 'from-blue-500 to-blue-600',
    },
    {
      day: 3,
      title: 'Started Medicines',
      icon: Pill,
      color: 'from-primary to-primary/70',
    },
    {
      day: 5,
      title: 'Pain Reduced',
      icon: TrendingDown,
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      day: 7,
      title: 'Walking Without Support',
      icon: Footprints,
      color: 'from-orange-500 to-orange-600',
    },
    {
      day: 10,
      title: 'Follow-up Completed',
      icon: CheckCircle2,
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      day: 12,
      title: 'Recovery Score 82%',
      icon: Activity,
      color: 'from-accent to-accent/70',
    },
  ]

  return (
    <Card className="bg-white border-border">
      <CardHeader>
        <CardTitle>Recovery Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-6 pl-4">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-accent" />

          {/* Timeline events */}
          {timelineEvents.map((event, index) => {
            const Icon = event.icon
            return (
              <div key={index} className="relative pb-4">
                {/* Event circle */}
                <div className={`absolute -left-4 top-0 w-8 h-8 rounded-full bg-gradient-to-br ${event.color} flex items-center justify-center border-4 border-background shadow-md`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>

                {/* Event content */}
                <div className="ml-8 bg-gradient-to-br from-muted/30 to-background p-4 rounded-lg border border-border">
                  <p className="text-xs font-semibold text-primary mb-1">Day {event.day}</p>
                  <p className="text-sm font-semibold text-foreground">{event.title}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
