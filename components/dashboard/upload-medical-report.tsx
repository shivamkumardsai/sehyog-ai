'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, Camera, FileText, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

export function UploadMedicalReport() {
  const [uploaded, setUploaded] = useState(false)

  const recentUploads = [
    { name: 'Discharge_Summary_28-06.pdf', date: '28 Jun, 2 PM' },
    { name: 'Lab_Report_26-06.pdf', date: '26 Jun, 10 AM' },
    { name: 'Prescription_25-06.pdf', date: '25 Jun, 5 PM' },
  ]

  return (
    <Card className="bg-white border-border">
      <CardHeader>
        <CardTitle>Upload Medical Report</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Drag and Drop Area */}
        <div className="border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-8 text-center hover:border-primary/50 transition cursor-pointer">
          <Upload className="w-12 h-12 text-primary mx-auto mb-3" />
          <p className="text-sm font-semibold text-foreground mb-1">
            Drag and drop your file here
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            or click to select from your device
          </p>
          <div className="flex gap-2 justify-center mb-4">
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">PDF</span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
              Lab Reports
            </span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
              Discharge Summary
            </span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">ABHA</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button className="flex-1 bg-primary hover:bg-primary/90" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Upload File
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            size="sm"
            onClick={() => setUploaded(true)}
          >
            <Camera className="w-4 h-4 mr-2" />
            Take Photo
          </Button>
        </div>

        {/* Recent Uploads */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">Recent Uploads</p>
          <div className="space-y-2">
            {recentUploads.map((upload, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border"
              >
                <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{upload.name}</p>
                  <p className="text-xs text-muted-foreground">{upload.date}</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Status Message */}
        {uploaded && (
          <div className="flex items-center gap-2 p-3 bg-accent/10 border border-accent/30 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
            <p className="text-sm text-foreground">
              <span className="font-semibold">AI Analysis Ready</span> - Your report has been
              processed
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
