'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { AlertTriangle, Phone } from 'lucide-react'

export function EmergencySOS() {
  const [isPressed, setIsPressed] = useState(false)

  const handleSOSClick = () => {
    setIsPressed(true)
    // In a real app, this would trigger an emergency alert
    setTimeout(() => setIsPressed(false), 3000)
  }

  return (
    <Card className="border-2 border-destructive/30 bg-gradient-to-r from-destructive/5 to-destructive/10">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AlertTriangle className="w-8 h-8 text-destructive" />
            <div>
              <h3 className="font-bold text-foreground mb-1">Emergency SOS</h3>
              <p className="text-sm text-muted-foreground">
                Tap the button below to send emergency alert to caregivers and nearest medical facility
              </p>
            </div>
          </div>

          <button
            onClick={handleSOSClick}
            className={`w-32 h-32 rounded-full font-bold text-white text-lg flex items-center justify-center gap-2 transition-all transform ${
              isPressed
                ? 'bg-green-500 scale-95'
                : 'bg-gradient-to-br from-destructive to-red-600 hover:shadow-2xl hover:shadow-destructive/30 active:scale-95'
            }`}
          >
            <Phone className="w-6 h-6" />
            {isPressed ? 'Sent!' : 'SOS'}
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
