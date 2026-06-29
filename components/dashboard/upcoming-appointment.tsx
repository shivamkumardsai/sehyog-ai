import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function UpcomingAppointment() {
  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Upcoming Appointment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-6 rounded-xl border border-primary/20">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-1">Appointment Date</p>
            <p className="text-lg font-bold text-foreground">Tomorrow</p>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2 text-foreground">
              <Clock className="w-4 h-4 text-accent" />
              <span className="font-semibold">10:30 AM</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="font-semibold">AIIMS Patna</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Doctor</p>
            <p className="font-semibold text-foreground">Dr. Raj Kumar, MD</p>
            <p className="text-xs text-muted-foreground">Cardiology Department</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="w-full">
            Reschedule
          </Button>
          <Button className="w-full bg-primary hover:bg-primary/90">
            Confirm
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
