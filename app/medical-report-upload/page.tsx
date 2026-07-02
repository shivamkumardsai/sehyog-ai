'use client'

import Link from 'next/link'
import { Sidebar } from '@/components/dashboard/sidebar'
import { TopBar } from '@/components/dashboard/topbar'
import { UploadMedicalReport } from '@/components/dashboard/upload-medical-report'
import { DashboardDataProvider } from '@/components/providers/dashboard-data-provider'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function MedicalReportUploadPage() {
  return (
    <DashboardDataProvider>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-auto p-4 sm:p-8">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Upload Medical Report</h1>
                  <p className="text-muted-foreground mt-1">
                    Upload a discharge summary, lab report, or prescription for AI analysis.
                  </p>
                </div>
                <Link href="/dashboard">
                  <Button variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
              </div>
              <UploadMedicalReport redirectOnSuccess />
            </div>
          </main>
        </div>
      </div>
    </DashboardDataProvider>
  )
}
