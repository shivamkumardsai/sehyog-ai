'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { AnalysisData, DashboardStats } from '@/lib/types/analysis'

interface DashboardContextValue {
  stats: DashboardStats | null
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
}

const defaultStats: DashboardStats = {
  totalReports: 0,
  pendingAnalysis: 0,
  completedReports: 0,
  recentUploads: [],
  riskStats: { low: 0, medium: 0, high: 0, unknown: 0 },
  latestAnalysis: null,
}

const DashboardContext = createContext<DashboardContextValue>({
  stats: null,
  loading: true,
  error: null,
  refresh: async () => {},
})

export function DashboardDataProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const CACHE_KEY = 'dashboardStatsCache'
  const CACHE_TTL = 10 * 1000 // 10s

  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/dashboard/stats')
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to load dashboard data')
      }
      setStats(data)
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }))
      } catch (e) {
        console.warn('Could not write dashboard cache', e)
      }
      if (data.latestAnalysis) {
        localStorage.setItem('medicalAnalysis', JSON.stringify(data.latestAnalysis))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data')
      setStats(defaultStats)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Try to hydrate from short-lived session cache for instant UI, then revalidate
    try {
      const raw = sessionStorage.getItem(CACHE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed?.ts && Date.now() - parsed.ts < CACHE_TTL) {
          setStats(parsed.data)
          setLoading(false)
          // revalidate in background
          refresh()
          return
        }
      }
    } catch (e) {
      // ignore cache errors
    }

    refresh()
  }, [refresh])

  const value = useMemo(
    () => ({ stats, loading, error, refresh }),
    [stats, loading, error, refresh]
  )

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}

export function useDashboardData() {
  return useContext(DashboardContext)
}

export function useLatestAnalysis(): AnalysisData | null {
  const { stats } = useDashboardData()
  return stats?.latestAnalysis ?? null
}
