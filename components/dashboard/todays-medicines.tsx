'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { showToasts } from '@/lib/toast-utils'
import { Pill, Check, Clock } from 'lucide-react'
import { useLatestAnalysis } from '@/components/providers/dashboard-data-provider'

interface MedicineSlot {
  time: string
  status: 'completed' | 'pending'
  medicines: string[]
}

export function TodaysMedicines() {
  const analysis = useLatestAnalysis()
  const [medicines, setMedicines] = useState<MedicineSlot[]>([])

  useEffect(() => {
    const meds = analysis?.medicines ?? []
    if (meds.length === 0) {
      setMedicines([
        {
          time: 'Morning',
          status: 'pending',
          medicines: ['Upload a report to extract medicines'],
        },
      ])
      return
    }

    const chunkSize = Math.ceil(meds.length / 3)
    const slots = ['Morning', 'Afternoon', 'Evening']
    setMedicines(
      slots
        .map((time, index) => ({
          time,
          status: index === 0 ? 'completed' as const : 'pending' as const,
          medicines: meds.slice(index * chunkSize, (index + 1) * chunkSize),
        }))
        .filter((slot) => slot.medicines.length > 0)
    )
  }, [analysis])

  const handleMarkComplete = (time: string) => {
    setMedicines(
      medicines.map((slot) =>
        slot.time === time ? { ...slot, status: 'completed' as const } : slot
      )
    )
    showToasts.medicineReminderSaved()
  }

  return (
    <Card className="border border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Pill className="w-5 h-5 text-primary" />
          Today&apos;s Medicines
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {medicines.map((slot, i) => (
            <button
              key={i}
              onClick={() => slot.status === 'pending' && handleMarkComplete(slot.time)}
              disabled={slot.status === 'completed'}
              className="w-full border border-border rounded-lg p-4 text-left hover:bg-muted/30 disabled:opacity-60 transition"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-foreground">{slot.time}</span>
                <div className="flex items-center gap-2">
                  {slot.status === 'completed' ? (
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      <Check className="w-3 h-3" />
                      Completed
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                      <Clock className="w-3 h-3" />
                      Pending
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                {slot.medicines.map((med, j) => (
                  <div key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {med}
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
