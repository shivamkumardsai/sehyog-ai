'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Pill,
  TrendingUp,
  AlertTriangle,
  Settings,
  LogOut,
} from 'lucide-react'
import { showToasts } from '@/lib/toast-utils'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: FileText, label: 'Medical Reports', href: '/Medical-report-upload' },
  { icon: TrendingUp, label: 'AI Analysis', href: '/ai-report-analysis' },
  { icon: Pill, label: 'Medicine Manager', href: '/dashboard' },
  { icon: AlertTriangle, label: 'Emergency', href: '/dashboard' },
]

const bottomItems = [{ icon: Settings, label: 'Settings', href: '/dashboard' }]

export function Sidebar() {
  const pathname = usePathname()
  const user = { name: 'Shivam Kumar' }

  async function handleLogout() {
    window.location.href = "/"
  }


  return (
    <aside className="hidden md:flex md:w-64 bg-white border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image src="/icon.svg" alt="SEHYOG AI" width={40} height={40} className="rounded-lg" />
          </div>
          <div className="font-bold text-lg text-foreground">SEHYOG AI</div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-4 space-y-2">
        {user?.name && (
          <p className="px-4 text-xs text-muted-foreground truncate">{user.name}</p>
        )}
        {bottomItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition"
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
