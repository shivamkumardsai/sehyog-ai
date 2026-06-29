import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, Lightbulb } from 'lucide-react'

export function RecoverySummary() {
  const recommendations = [
    'Today\'s recovery is progressing well.',
    'Continue medicines as prescribed.',
    'Walk for 20 minutes to improve mobility.',
    'Stay hydrated - drink 8-10 glasses of water daily.',
  ]

  return (
    <Card className="border border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI Recovery Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.map((rec, i) => (
            <div key={i} className="flex gap-3 items-start p-3 bg-muted/30 rounded-lg border border-border/50">
              <Lightbulb className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-foreground text-sm">{rec}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
