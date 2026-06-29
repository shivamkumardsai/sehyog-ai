'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Share2,
  Volume2,
  Copy,
  TrendingUp,
  Pill,
  Calendar,
  Shield,
  Brain,
  ArrowRight,
  Zap,
} from 'lucide-react'

export default function AIReportAnalysisPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your AI Analysis Report
          </h1>
          <p className="text-lg text-muted-foreground">
            Based on your discharge summary and health records
          </p>
        </div>

        {/* Overall Recovery Score */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-border rounded-2xl p-8 text-center">
              <div className="text-6xl font-bold text-primary mb-2">82%</div>
              <p className="text-muted-foreground">Overall Recovery Score</p>
            </div>
            <div className="bg-white border border-border rounded-2xl p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-8 h-8 text-accent" />
                <span className="text-3xl font-bold text-accent">Low Risk</span>
              </div>
              <p className="text-muted-foreground">Current Status</p>
            </div>
            <div className="bg-white border border-border rounded-2xl p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Brain className="w-8 h-8 text-primary" />
                <span className="text-3xl font-bold text-primary">94%</span>
              </div>
              <p className="text-muted-foreground">AI Confidence</p>
            </div>
          </div>
        </div>

        {/* AI Summary */}
        <div className="mb-12 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <Zap className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">AI Summary</h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>Patient is recovering normally with stable vital signs and good compliance with medication schedule.</p>
                <p>No major complications detected based on the uploaded discharge summary and lab reports.</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Continue current medicines as prescribed</li>
                  <li>Follow up after five days for progress assessment</li>
                  <li>Monitor for any fever or unusual symptoms</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Detected Conditions */}
          <div className="bg-white border border-border rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-primary" />
              Detected Conditions
            </h3>
            <div className="space-y-4">
              {[
                { condition: 'Hypertension', status: 'Controlled', color: 'text-accent' },
                { condition: 'Diabetes', status: 'Moderate', color: 'text-amber-600' },
                { condition: 'Vitamin D Deficiency', status: 'Low', color: 'text-orange-600' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">{item.condition}</p>
                  </div>
                  <span className={`px-3 py-1 bg-muted rounded-full text-sm font-semibold ${item.color}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Medicine Schedule */}
          <div className="bg-white border border-border rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Pill className="w-6 h-6 text-primary" />
              Medicine Schedule
            </h3>
            <div className="space-y-4">
              {[
                { time: 'Morning', medicines: ['Paracetamol', 'Vitamin D'] },
                { time: 'Afternoon', medicines: ['Antibiotic'] },
                { time: 'Night', medicines: ['Pain Relief Tablet'] },
              ].map((slot, i) => (
                <div key={i} className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10">
                  <p className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {slot.time}
                  </p>
                  <ul className="space-y-1">
                    {slot.medicines.map((med, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-accent" />
                        {med}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Important Warnings */}
        <div className="mb-12 bg-white border border-border rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-destructive" />
            Important Warnings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Avoid lifting heavy weight',
              'Monitor fever - seek immediate medical attention if temp exceeds 101°F',
              'Drink plenty of water',
              'Complete antibiotics course even if feeling better',
            ].map((warning, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-destructive/5 rounded-lg border border-destructive/10">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-foreground text-sm">{warning}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hospital Follow-up */}
        <div className="mb-12 bg-gradient-to-br from-blue-50 to-primary/5 border border-primary/20 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            Hospital Follow-up
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Hospital</p>
              <p className="font-bold text-foreground">AIIMS Patna</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Date</p>
              <p className="font-bold text-foreground">2 July</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Time</p>
              <p className="font-bold text-foreground">10:30 AM</p>
            </div>
          </div>
        </div>

        {/* Explain Report */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Explain Report</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: <Copy className="w-5 h-5" />, label: 'Explain in Hindi', color: 'bg-blue-50 hover:bg-blue-100 text-primary border-blue-200' },
              { icon: <Volume2 className="w-5 h-5" />, label: 'Explain Simply', color: 'bg-green-50 hover:bg-green-100 text-accent border-green-200' },
              { icon: <Volume2 className="w-5 h-5" />, label: 'Read Aloud', color: 'bg-purple-50 hover:bg-purple-100 text-purple-600 border-purple-200' },
            ].map((btn, i) => (
              <Button
                key={i}
                variant="outline"
                className={`h-14 rounded-xl border-2 ${btn.color} font-semibold transition`}
              >
                {btn.icon}
                <span className="ml-2">{btn.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="bg-white border border-border rounded-2xl p-8 mb-12">
          <h3 className="text-xl font-bold text-foreground mb-6">Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-12 rounded-xl border-2">
              <Download className="mr-2 w-4 h-4" />
              Download Summary PDF
            </Button>
            <Button variant="outline" className="h-12 rounded-xl border-2">
              <Share2 className="mr-2 w-4 h-4" />
              Share with Family
            </Button>
            <Link href="/dashboard">
              <Button className="h-12 rounded-xl w-full bg-primary hover:bg-primary/90">
                Continue to Recovery Tracker
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* CTA */}        
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Need more information?</p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-accent hover:bg-accent/90 h-12 px-8 rounded-xl">
              Back to Dashboard
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
