'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LoadingSteps } from '@/components/ui/loading-steps'
import { showToasts } from '@/lib/toast-utils'
import {
  Upload,
  FileText,
  Image as ImageIcon,
  Heart,
  CheckCircle,
  AlertCircle,
  Lock,
  Download,
  Calendar,
  Clock,
  ArrowRight,
  Camera,
  Folder,
} from 'lucide-react'

const UPLOAD_STEPS = [
  { label: 'Uploading Report...', duration: 800 },
  { label: 'Extracting Text...', duration: 1000 },
  { label: 'Analyzing Report...', duration: 1200 },
  { label: 'Identifying Medicines...', duration: 1000 },
  { label: 'Generating Recovery Plan...', duration: 1500 },
  { label: 'Calculating Risk Score...', duration: 1000 },
]

export default function MedicalReportUploadPage() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    simulateUploadWithSteps()
  }

  const simulateUploadWithSteps = async () => {
    setIsLoading(true)
    setUploadProgress(0)
    setCurrentStep(0)
    setIsComplete(false)

    // Show initial toast
    showToasts.info('Starting upload', 'Your medical report is being processed...')

    // Simulate each step
    for (let i = 0; i < UPLOAD_STEPS.length; i++) {
      setCurrentStep(i)
      await new Promise(resolve => setTimeout(resolve, UPLOAD_STEPS[i].duration))
      setUploadProgress(((i + 1) / UPLOAD_STEPS.length) * 100)
    }

    // Mark as complete
    setIsComplete(true)
    setIsLoading(false)

    // Show success toast
    showToasts.reportUploaded()

    // Reset after delay
    setTimeout(() => {
      setUploadProgress(100)
    }, 500)
  }

  const handleUploadClick = () => {
    simulateUploadWithSteps()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Medical Report Upload</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload discharge summaries, prescriptions, lab reports or ABHA health records for AI analysis.
          </p>
        </div>

        {/* Large Upload Area */}
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`mb-12 p-12 rounded-3xl border-2 border-dashed transition-all ${
            isDragging
              ? 'border-primary bg-primary/5 scale-105'
              : 'border-border bg-white hover:bg-muted/30'
          }`}
        >
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl">
                <Upload className="w-12 h-12 text-primary" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Drag & Drop Zone</h2>
              <p className="text-muted-foreground mb-6">Drop your medical reports here or click to browse</p>
            </div>

            {/* Supported Files */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-6 border-y border-border">
              {[
                { label: 'PDF', icon: <FileText className="w-5 h-5" /> },
                { label: 'Image', icon: <ImageIcon className="w-5 h-5" /> },
                { label: 'ABHA Record', icon: <Heart className="w-5 h-5" /> },
                { label: 'Lab Report', icon: <FileText className="w-5 h-5" /> },
                { label: 'Prescription', icon: <FileText className="w-5 h-5" /> },
              ].map((file, i) => (
                <div key={i} className="flex flex-col items-center gap-2 p-3">
                  <div className="text-primary/70">{file.icon}</div>
                  <span className="text-xs font-medium text-foreground text-center">{file.label}</span>
                </div>
              ))}
            </div>

            {/* Upload Buttons */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <Button 
                onClick={handleUploadClick}
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 h-12 rounded-xl disabled:opacity-50"
              >
                <Upload className="mr-2 w-4 h-4" />
                {isLoading ? 'Processing...' : 'Upload Report'}
              </Button>
              <Button variant="outline" className="h-12 rounded-xl border-2" disabled={isLoading}>
                <Camera className="mr-2 w-4 h-4" />
                Take Photo
              </Button>
              <Button variant="outline" className="h-12 rounded-xl border-2" disabled={isLoading}>
                <Folder className="mr-2 w-4 h-4" />
                Choose Device
              </Button>
            </div>
          </div>
        </div>

        {/* Loading Steps */}
        {isLoading && (
          <div className="mb-12 bg-white border border-border rounded-xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-6">Processing Your Report</h3>
            <LoadingSteps 
              steps={UPLOAD_STEPS}
              currentStep={currentStep}
              isComplete={isComplete}
            />
          </div>
        )}

        {/* Recent Uploads */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Recent Uploads</h3>
          <div className="space-y-4">
            {[
              {
                name: 'Discharge Summary.pdf',
                date: 'Uploaded Today',
                status: 'AI Ready',
                statusColor: 'text-accent',
                statusBg: 'bg-accent/10',
                icon: <CheckCircle className="w-5 h-5 text-accent" />,
              },
              {
                name: 'Blood_Test.pdf',
                date: 'Yesterday',
                status: 'AI Processed',
                statusColor: 'text-green-600',
                statusBg: 'bg-green-50',
                icon: <CheckCircle className="w-5 h-5 text-green-600" />,
              },
              {
                name: 'Prescription.jpg',
                date: 'Today',
                status: 'Pending',
                statusColor: 'text-amber-600',
                statusBg: 'bg-amber-50',
                icon: <AlertCircle className="w-5 h-5 text-amber-600" />,
              },
            ].map((upload, i) => (
              <div
                key={i}
                className="bg-white border border-border rounded-xl p-6 flex items-center justify-between hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">{upload.icon}</div>
                  <div>
                    <p className="font-semibold text-foreground">{upload.name}</p>
                    <p className="text-sm text-muted-foreground">{upload.date}</p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${upload.statusColor} ${upload.statusBg}`}>
                  {upload.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Progress */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mb-12">
            <h3 className="text-lg font-bold text-foreground mb-4">Upload Progress</h3>
            <div className="bg-white p-6 rounded-xl border border-border">
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-3 text-center">{Math.round(uploadProgress)}% uploaded</p>
            </div>
          </div>
        )}

        {uploadProgress === 100 && (
          <div className="mb-12">
            <div className="bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/30 p-6 rounded-xl flex items-center gap-4">
              <CheckCircle className="w-8 h-8 text-accent flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Upload Complete</p>
                <p className="text-sm text-muted-foreground">Your report has been successfully uploaded and is ready for AI analysis.</p>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Card */}
        <div className="mb-12 bg-gradient-to-br from-blue-50 to-primary/5 border border-primary/20 p-8 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/20 rounded-full flex-shrink-0">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">Your Privacy is Protected</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your reports are encrypted end-to-end. Only you and your authorized healthcare providers can access your health data. SEHYOG AI never stores or shares your personal information.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="flex justify-center">
          <Link href="/ai-report-analysis">
            <Button size="lg" className="bg-primary hover:bg-primary/90 h-14 px-8 rounded-xl text-lg">
              Analyze with AI
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
