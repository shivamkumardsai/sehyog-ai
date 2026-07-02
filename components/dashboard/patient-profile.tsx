'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Calendar, Stethoscope, Heart, Activity } from 'lucide-react'
import { useLatestAnalysis } from '@/components/providers/dashboard-data-provider'

export function PatientProfile() {
  const user = { name: 'Shivam Kumar', email: 'shivam@example.com' }
  const analysis = useLatestAnalysis()

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <CardHeader>
        <CardTitle>Patient Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-8">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white mb-4 shadow-lg">
              <User className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              {user?.name ?? 'Caregiver'}
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              {analysis?.conditions[0] ?? 'Post-hospital recovery'}
            </p>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground mb-1">Recovery Score</p>
                <p className="text-lg font-bold text-foreground">
                  {analysis ? `${analysis.recoveryScore}%` : '—'}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-3 h-3 text-accent" />
                  <p className="text-xs text-muted-foreground">Risk Level</p>
                </div>
                <p className="text-lg font-bold text-foreground capitalize">
                  {analysis?.risk ?? 'Unknown'}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-1">
                  <Stethoscope className="w-3 h-3 text-primary" />
                  <p className="text-xs text-muted-foreground">Conditions</p>
                </div>
                <p className="text-sm font-bold text-foreground">
                  {analysis?.conditions.length ?? 0} detected
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="w-3 h-3 text-red-500" />
                  <p className="text-xs text-muted-foreground">Medicines</p>
                </div>
                <p className="text-sm font-bold text-foreground">
                  {analysis?.medicines.length ?? 0} prescribed
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-3 h-3 text-blue-500" />
                  <p className="text-xs text-muted-foreground">AI Confidence</p>
                </div>
                <p className="text-lg font-bold text-foreground">
                  {analysis ? `${analysis.confidence}%` : '—'}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground mb-1">Caregiver</p>
                <p className="text-sm font-bold text-foreground truncate">
                  {user?.email ?? 'Not signed in'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
