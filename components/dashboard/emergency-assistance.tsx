'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { showToasts } from '@/lib/toast-utils'
import { MapPin, Phone, Share2, Users, AlertTriangle } from 'lucide-react'

export function EmergencyAssistance() {
  const handleCallAmbulance = () => {
    showToasts.success('Ambulance Called', 'Emergency services have been contacted.')
    showToasts.emergencyAlertSent()
  }

  const handleShareLocation = () => {
    showToasts.success('Location Shared', 'Your location has been shared with emergency contacts.')
  }

  const handleNotifyFamily = () => {
    showToasts.success('Family Notified', 'Emergency alert sent to your family members.')
  }

  return (
    <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
      <CardHeader>
        <CardTitle className="text-red-700 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Emergency Assistance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Nearest Hospital */}
        <div className="bg-white p-6 rounded-lg border border-red-100 space-y-4">
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Nearest Hospital</p>
              <p className="text-lg font-bold text-foreground">AIIMS Patna</p>
            </div>
            <div className="flex items-center gap-2 text-accent">
              <MapPin className="w-5 h-5" />
              <p className="font-semibold">2.3 km away</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <Button
              size="sm"
              className="bg-red-600 hover:bg-red-700 w-full"
              onClick={handleCallAmbulance}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Ambulance
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-red-200 w-full"
              onClick={handleShareLocation}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Location
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-red-200 w-full"
              onClick={handleNotifyFamily}
            >
              <Users className="w-4 h-4 mr-2" />
              Notify Family
            </Button>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Emergency Contacts</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Doctor', value: 'Dr Amit Kumar', action: 'Call' },
              { label: 'Hospital', value: 'AIIMS Patna', action: 'Call' },
              { label: 'Family', value: 'Shivam Kumar', action: 'Call' },
            ].map((contact, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-red-100">
                <p className="text-xs text-muted-foreground mb-1">{contact.label}</p>
                <p className="text-sm font-semibold text-foreground mb-2 truncate">
                  {contact.value}
                </p>
                <button className="text-xs text-red-600 font-semibold hover:text-red-700 transition">
                  {contact.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Warning Message */}
        <div className="flex gap-3 p-3 bg-red-100 border border-red-200 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">
            <span className="font-semibold">Use only in emergencies.</span> For non-urgent
            concerns, contact your doctor.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
