import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Heart,
  Pill,
  TrendingUp,
  Brain,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Activity,
  AlertTriangle,
  Shield,
  FileText,
  Stethoscope,
  Calendar,
  CheckSquare,
  Home,
} from 'lucide-react'

export default function Page() {
  return (
    <div className="w-full bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/sehyog-logo.png"
              alt="SEHYOG AI Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="font-bold text-xl text-foreground">SEHYOG AI</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-foreground hover:text-primary transition">
              Home
            </a>
            <a href="#features" className="text-foreground hover:text-primary transition">
              Features
            </a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition">
              How It Works
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition">
              About
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" className="hidden sm:inline-flex">
                Login
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative py-20 md:py-32 bg-gradient-to-br from-background via-white to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                {/* Badge */}
                <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                  AI-Powered Post-Hospital Recovery Platform
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                  Making Home Recovery Safer, Simpler & Smarter with AI
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  SEHYOG AI helps families understand discharge summaries, manage medicines, monitor recovery, and confidently care for loved ones after hospital discharge.
                </p>
              </div>

              <div className="flex gap-4 flex-col sm:flex-row">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-2">
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Right Dashboard Preview */}
            <div className="relative">
              {/* Laptop frame */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-8 border-gray-900">
                {/* Dashboard header */}
                <div className="bg-gradient-to-r from-primary/90 to-accent/90 px-6 py-4 text-white flex items-center justify-between">
                  <h3 className="font-bold text-lg">Recovery Dashboard</h3>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-white/30 rounded-full" />
                    <div className="w-3 h-3 bg-white/30 rounded-full" />
                    <div className="w-3 h-3 bg-white/30 rounded-full" />
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="p-6 bg-gradient-to-br from-white to-muted/20 space-y-6">
                  {/* Top stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 sm:p-8 rounded-xl border border-border">
                      <div className="text-sm text-muted-foreground">Patient Name</div>
                      <div className="font-bold text-foreground mt-1">Rajesh Kumar</div>
                    </div>
                    <div className="bg-white p-4 sm:p-8 rounded-xl border border-border">
                      <div className="text-sm text-muted-foreground">Recovery Score</div>
                      <div className="font-bold text-accent mt-1 flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        82%
                      </div>
                    </div>
                    <div className="bg-white p-4 sm:p-8 rounded-xl border border-border">
                      <div className="text-sm text-muted-foreground">Status</div>
                      <div className="font-bold text-primary mt-1">On Track</div>
                    </div>
                  </div>

                  {/* Middle section */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-border">
                      <div className="text-sm text-muted-foreground mb-2">Today&apos;s Medicines</div>
                      <div className="space-y-2">
                        <div className="text-xs font-semibold flex items-center gap-2">
                          <CheckSquare className="w-4 h-4 text-accent" />
                          2/3 Completed
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-border">
                      <div className="text-sm text-muted-foreground mb-2">Pain Level</div>
                      <div className="text-sm font-semibold text-foreground">Moderate (4/10)</div>
                    </div>
                  </div>

                  {/* AI Summary */}
                  <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 rounded-xl border border-primary/20">
                    <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-primary" />
                      AI Recovery Summary
                    </div>
                    <div className="text-sm text-foreground font-medium">Recovery progressing well. Continue current medicines. Next doctor visit: June 30.</div>
                  </div>
                </div>
              </div>

              {/* Laptop stand */}
              <div className="flex justify-center gap-8 px-8 mt-2">
                <div className="w-24 h-2 bg-gray-900 rounded-b-lg" />
                <div className="w-24 h-2 bg-gray-900 rounded-b-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem We Solve Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Illustration */}
            <div className="relative h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Simple illustration of patient at home */}
                  <div className="space-y-4 w-full max-w-xs">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-accent">
                      <div className="flex items-center gap-3 mb-2">
                        <Stethoscope className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-sm text-foreground">Hospital Discharge Day</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Patient heading home with care instructions</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-accent">
                      <div className="flex items-center gap-3 mb-2">
                        <Home className="w-5 h-5 text-accent" />
                        <span className="font-semibold text-sm text-foreground">Recovery at Home</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Family manages care without continuous guidance</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Hospital Recovery Doesn&apos;t End at Discharge
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Millions of families care for recovering patients at home without continuous guidance. Caregivers often struggle to understand discharge summaries, remember medicines, identify warning signs, and track recovery progress.
                </p>
              </div>

              {/* Problem cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <FileText className="w-5 h-5" />, title: 'Confusing Medical Reports' },
                  { icon: <Pill className="w-5 h-5" />, title: 'Missed Medicines' },
                  { icon: <AlertTriangle className="w-5 h-5" />, title: 'Recovery Anxiety' },
                  { icon: <Clock className="w-5 h-5" />, title: 'No Daily Guidance' },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg border border-border shadow-sm hover:shadow-md transition">
                    <div className="text-destructive mb-2">{item.icon}</div>
                    <div className="font-semibold text-sm text-foreground">{item.title}</div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-xl border border-primary/20">
                <p className="text-foreground font-semibold flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  SEHYOG AI bridges this gap with AI-powered recovery assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why SEHYOG AI Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why SEHYOG AI?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four powerful features designed to empower caregivers
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <FileText className="w-12 h-12" />,
                title: 'Understand Medical Reports',
                description:
                  'AI explains prescriptions and discharge summaries in simple language.',
                color: 'text-primary',
              },
              {
                icon: <Pill className="w-12 h-12" />,
                title: 'Medicine Management',
                description:
                  'Never miss medicines with reminders and dosage tracking.',
                color: 'text-accent',
              },
              {
                icon: <Activity className="w-12 h-12" />,
                title: 'Recovery Tracking',
                description:
                  'Monitor recovery with daily health updates and progress charts.',
                color: 'text-primary',
              },
              {
                icon: <Shield className="w-12 h-12" />,
                title: 'Emergency Risk Detection',
                description:
                  'Detect warning symptoms and recommend when immediate medical attention is needed.',
                color: 'text-red-500',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-white to-muted/20 p-8 rounded-2xl border border-border shadow-sm hover:shadow-lg transition min-h-80 flex flex-col justify-between"
              >
                <div>
                  <div className={`${item.color} mb-4`}>{item.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - Timeline */}
      <section id="how-it-works" className="py-20 md:py-28 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Six steps to comprehensive home recovery management
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary/50" />

            {/* Timeline steps */}
            <div className="grid md:grid-cols-6 gap-6 md:gap-2">
              {[
                {
                  number: '1',
                  icon: <Stethoscope className="w-8 h-8" />,
                  title: 'Hospital Discharge',
                  color: 'from-primary to-primary/70',
                },
                {
                  number: '2',
                  icon: <FileText className="w-8 h-8" />,
                  title: 'Upload Medical Report',
                  color: 'from-blue-500 to-blue-600',
                },
                {
                  number: '3',
                  icon: <Brain className="w-8 h-8" />,
                  title: 'AI Creates Recovery Plan',
                  color: 'from-purple-500 to-purple-600',
                },
                {
                  number: '4',
                  icon: <Clock className="w-8 h-8" />,
                  title: 'Daily Care Guidance',
                  color: 'from-accent to-accent/70',
                },
                {
                  number: '5',
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: 'Recovery Monitoring',
                  color: 'from-emerald-500 to-emerald-600',
                },
                {
                  number: '6',
                  icon: <CheckCircle className="w-8 h-8" />,
                  title: 'Visit Doctor if Needed',
                  color: 'from-orange-500 to-orange-600',
                },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  {/* Timeline circle */}
                  <div className={`relative z-10 w-24 h-24 rounded-full bg-gradient-to-br ${item.color} text-white flex flex-col items-center justify-center shadow-lg mb-6 hover:shadow-xl transition`}>
                    <div className="text-2xl font-bold">{item.number}</div>
                    <div className="text-xs font-semibold">Step</div>
                  </div>

                  {/* Step label */}
                  <div className="text-center">
                    <h3 className="font-bold text-foreground text-sm md:text-base">{item.title}</h3>
                  </div>

                  {/* Icon */}
                  <div className="mt-4 text-muted-foreground">
                    {item.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-block bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-xl border border-primary/20">
              <p className="text-foreground font-semibold mb-4">Start your recovery journey today</p>
              <Link href="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Begin Recovery Plan
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Core Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for comprehensive home care management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Pill className="w-8 h-8" />,
                title: 'Medicine Management',
                description: 'Automated reminders, dosage tracking, and medication interactions alert system.',
              },
              {
                icon: <Brain className="w-8 h-8" />,
                title: 'Report Analysis',
                description:
                  'AI-powered interpretation of medical reports, lab results, and health data.',
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Recovery Tracking',
                description: 'Visual progress charts and milestone tracking for better patient outcomes.',
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: 'Daily Care Plans',
                description: 'Personalized daily care routines generated by AI for each patient.',
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Family Collaboration',
                description: 'Share updates and coordinate care with family members securely.',
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: 'Health Alerts',
                description: 'Real-time notifications for important health changes and alerts.',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-white via-white to-muted/20 p-8 rounded-2xl border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all group"
              >
                <div className="text-primary group-hover:scale-110 transition-transform mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expected Social Impact Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Expected Social Impact</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              How SEHYOG AI transforms home recovery for families
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Pill className="w-12 h-12" />,
                title: 'Reduce medicine errors',
                description: 'AI-powered reminders help prevent medication mistakes during recovery.',
                color: 'text-primary',
              },
              {
                icon: <Heart className="w-12 h-12" />,
                title: 'Reduce caregiver stress',
                description: 'Automated tracking and guidance reduce the emotional burden on families.',
                color: 'text-red-500',
              },
              {
                icon: <FileText className="w-12 h-12" />,
                title: 'Improve report understanding',
                description: 'Complex medical reports are simplified into actionable insights.',
                color: 'text-blue-500',
              },
              {
                icon: <Shield className="w-12 h-12" />,
                title: 'Promote safer home recovery',
                description: 'Early warning detection reduces hospital readmissions significantly.',
                color: 'text-accent',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-border shadow-sm hover:shadow-lg transition">
                <div className={`${item.color} mb-4`}>{item.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why SEHYOG AI is Different - Comparison Table */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why SEHYOG AI is Different
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              How we compare to existing solutions
            </p>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left p-4 font-bold text-foreground">Feature</th>
                  <th className="text-center p-4 font-bold text-foreground">Existing Solutions</th>
                  <th className="text-center p-4 font-bold text-primary">SEHYOG AI</th>
                </tr>
              </thead>
              <tbody>
                {[
                  'Health Record Storage',
                  'AI Report Simplification',
                  'Medicine Tracking',
                  'Recovery Monitoring',
                  'Daily Care Plans',
                  'Emergency Guidance',
                ].map((feature, i) => (
                  <tr key={i} className="border-b border-border hover:bg-muted/20 transition">
                    <td className="p-4 font-semibold text-foreground">{feature}</td>
                    <td className="text-center p-4 text-muted-foreground">
                      {i === 0 ? '✓' : '-'}
                    </td>
                    <td className="text-center p-4">
                      <CheckCircle className="w-6 h-6 text-accent mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-2xl border border-primary/20">
            <p className="text-center text-foreground font-semibold">
              SEHYOG AI provides comprehensive post-hospital recovery management with AI-driven insights specifically designed for families caring for loved ones at home.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Empower Your Care?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Join thousands of families who are already using SEHYOG AI to provide better care at home.
              Start your free trial today—no credit card required.
            </p>
          </div>

          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10"
              >
                Explore Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/sehyog-logo.png"
                  alt="SEHYOG AI Logo"
                  width={32}
                  height={32}
                  className="rounded"
                />
                <span className="font-bold text-lg">SEHYOG AI</span>
              </div>
              <p className="text-white/70">Empowering caregivers with AI-powered insights.</p>
            </div>

            {[
              {
                title: 'Product',
                links: ['Features', 'Demo', 'Security', 'GitHub'],
              },
              {
                title: 'Company',
                links: ['About', 'Presentation', 'Contact', 'Privacy Policy'],
              },
              {
                title: 'Support',
                links: ['Help Center', 'Documentation', 'Contact Support', 'Status'],
              },
            ].map((column, i) => (
              <div key={i}>
                <h3 className="font-semibold mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-white/70 hover:text-white transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-white/70">© 2024 SEHYOG AI. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="text-white/70 hover:text-white transition">
                  Privacy Policy
                </a>
                <a href="#" className="text-white/70 hover:text-white transition">
                  Terms of Service
                </a>
                <a href="#" className="text-white/70 hover:text-white transition">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
