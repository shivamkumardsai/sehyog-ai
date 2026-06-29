'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, TrendingUp, AlertTriangle } from 'lucide-react'

export function AIMedicalSummary() {
  const vitals = [
    {
      label: 'Hemoglobin',
      value: '12.8',
      status: 'Normal',
      badge: 'bg-green-100 text-green-700',
    },
    {
      label: 'Blood Sugar',
      value: '145',
      status: 'High',
      badge: 'bg-yellow-100 text-yellow-700',
    },
    {
      label: 'Blood Pressure',
      value: '128/82',
      status: 'Normal',
      badge: 'bg-green-100 text-green-700',
    },
    {
      label: 'Oxygen',
      value: '98%',
      status: 'Good',
      badge: 'bg-green-100 text-green-700',
    },
  ]

  const doctorAdvice = [
    'Continue Antibiotics',
    'Review After 5 Days',
    'Avoid Heavy Weight Lifting',
  ]

  return (
    <Card className="bg-white border-border">
      <CardHeader>
        <CardTitle>AI Medical Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Vital Signs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {vitals.map((vital, index) => (
            <div key={index} className="bg-muted/30 p-4 rounded-lg border border-border">
              <p className="text-xs text-muted-foreground mb-2">{vital.label}</p>
              <p className="text-2xl font-bold text-foreground mb-2">{vital.value}</p>
              <span className={`text-xs font-semibold px-2 py-1 rounded ${vital.badge}`}>
                {vital.status}
              </span>
            </div>
          ))}
        </div>

        {/* Doctor Advice */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-4 rounded-lg border border-primary/20">
          <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Doctor Advice
          </p>
          <ul className="space-y-2">
            {doctorAdvice.map((advice, index) => (
              <li key={index} className="text-sm text-foreground flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                {advice}
              </li>
            ))}
          </ul>
        </div>

        {/* Alert for High Blood Sugar */}
        <div className="flex gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-yellow-900">
              Monitor Blood Sugar
            </p>
            <p className="text-xs text-yellow-800 mt-1">
              Blood sugar is slightly elevated. Consider dietary adjustments and follow doctor recommendations.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
