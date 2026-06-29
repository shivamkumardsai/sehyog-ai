import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Heart } from 'lucide-react'

export function WelcomeCard() {
  return (
    <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome back, Shivam</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Current Patient */}
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <p className="text-sm text-muted-foreground mb-2">Current Patient</p>
            <p className="text-lg font-bold text-foreground">Rajesh Kumar</p>
            <p className="text-xs text-muted-foreground mt-2">Father • 68 years old</p>
          </div>

          {/* Recovery Score */}
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-accent" />
              <p className="text-sm text-muted-foreground">Recovery Score</p>
            </div>
            <p className="text-3xl font-bold text-accent">82%</p>
            <p className="text-xs text-muted-foreground mt-2">Very Good</p>
          </div>

          {/* Status */}
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <p className="text-sm text-muted-foreground mb-2">Current Status</p>
            <p className="text-lg font-bold text-foreground">Stable</p>
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
          </div>

          {/* Days in Recovery */}
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <p className="text-sm text-muted-foreground mb-2">Days in Recovery</p>
            <p className="text-3xl font-bold text-primary">12</p>
            <p className="text-xs text-muted-foreground mt-2">Post-discharge</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
