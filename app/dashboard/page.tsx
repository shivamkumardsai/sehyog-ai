import { Sidebar } from '@/components/dashboard/sidebar'
import { TopBar } from '@/components/dashboard/topbar'
import { DashboardDataProvider } from '@/components/providers/dashboard-data-provider'
import { PatientProfile } from '@/components/dashboard/patient-profile'
import { RecoverySummary } from '@/components/dashboard/recovery-summary'
import { TodaysMedicines } from '@/components/dashboard/todays-medicines'
import { DailyCareChecklist } from '@/components/dashboard/daily-care-checklist'
import { AIRiskAnalysis } from '@/components/dashboard/ai-risk-analysis'
import { AIConfidenceBreakdown } from '@/components/dashboard/ai-confidence-breakdown'
import { RecoveryTimeline } from '@/components/dashboard/recovery-timeline'
import { UpcomingAppointment } from '@/components/dashboard/upcoming-appointment'
import { HealthAlerts } from '@/components/dashboard/health-alerts'
import { UploadMedicalReport } from '@/components/dashboard/upload-medical-report'
import { AIMedicalSummary } from '@/components/dashboard/ai-medical-summary'
import { DashboardStatsCards } from '@/components/dashboard/dashboard-stats-cards'
import { EmergencyAssistance } from '@/components/dashboard/emergency-assistance'
import { AIAssistantChat } from '@/components/dashboard/ai-assistant-chat'

export default function DashboardPage() {
  return (
    <DashboardDataProvider>
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
            <DashboardStatsCards />
            <PatientProfile />

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <RecoverySummary />
                <TodaysMedicines />
                <DailyCareChecklist />
                <AIMedicalSummary />
                <UploadMedicalReport />
              </div>

              {/* Right Column - Analysis & Info */}
              <div className="space-y-8">
                <AIRiskAnalysis />
                <AIConfidenceBreakdown />
                <RecoveryTimeline />
                <UpcomingAppointment />
                <HealthAlerts />
              </div>
            </div>

            {/* Emergency Assistance */}
            <EmergencyAssistance />
          </div>

          {/* AI Assistant Chat */}
          <AIAssistantChat />
        </main>
      </div>
    </div>
    </DashboardDataProvider>
  )
}
