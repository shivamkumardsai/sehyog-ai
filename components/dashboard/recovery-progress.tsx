import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

const progressData = [
  { day: 'Mon', score: 65 },
  { day: 'Tue', score: 68 },
  { day: 'Wed', score: 72 },
  { day: 'Thu', score: 75 },
  { day: 'Fri', score: 78 },
  { day: 'Sat', score: 80 },
  { day: 'Sun', score: 82 },
]

const maxScore = 100

export function RecoveryProgress() {
  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-accent" />
          Recovery Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Chart */}
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {progressData.map((data, i) => {
              const heightPercent = (data.score / maxScore) * 100
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center h-40">
                    <div
                      className="w-full bg-gradient-to-t from-primary to-accent rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: `${heightPercent}%`, maxHeight: '100%' }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {data.day}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-muted/30 p-3 rounded-lg">
              <p className="text-muted-foreground text-xs">Current</p>
              <p className="font-bold text-foreground">82%</p>
            </div>
            <div className="bg-muted/30 p-3 rounded-lg">
              <p className="text-muted-foreground text-xs">Weekly Gain</p>
              <p className="font-bold text-accent">+17%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
