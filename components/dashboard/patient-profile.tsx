'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Calendar, Stethoscope, Heart, Droplet, Globe } from 'lucide-react'

export function PatientProfile() {
  return (
    <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <CardHeader>
        <CardTitle>Patient Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-8">
          {/* Profile Avatar & Basic Info */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white mb-4 shadow-lg">
              <User className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Sunita Devi</h3>
            <p className="text-sm text-muted-foreground">Post Knee Replacement</p>
          </div>

          {/* Profile Details Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {/* Age */}
              <div className="bg-white p-4 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground mb-1">Age</p>
                <p className="text-lg font-bold text-foreground">58</p>
              </div>

              {/* Recovery Day */}
              <div className="bg-white p-4 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-3 h-3 text-accent" />
                  <p className="text-xs text-muted-foreground">Recovery Day</p>
                </div>
                <p className="text-lg font-bold text-foreground">12</p>
              </div>

              {/* Doctor */}
              <div className="bg-white p-4 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-1">
                  <Stethoscope className="w-3 h-3 text-primary" />
                  <p className="text-xs text-muted-foreground">Doctor</p>
                </div>
                <p className="text-sm font-bold text-foreground">Dr Amit Kumar</p>
              </div>

              {/* Hospital */}
              <div className="bg-white p-4 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground mb-1">Hospital</p>
                <p className="text-sm font-bold text-foreground">AIIMS Patna</p>
              </div>

              {/* Blood Group */}
              <div className="bg-white p-4 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-1">
                  <Droplet className="w-3 h-3 text-red-500" />
                  <p className="text-xs text-muted-foreground">Blood Group</p>
                </div>
                <p className="text-lg font-bold text-foreground">B+</p>
              </div>

              {/* Language */}
              <div className="bg-white p-4 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-1">
                  <Globe className="w-3 h-3 text-blue-500" />
                  <p className="text-xs text-muted-foreground">Language</p>
                </div>
                <p className="text-sm font-bold text-foreground">Hindi</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
