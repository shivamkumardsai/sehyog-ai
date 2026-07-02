'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Upload,
  Camera,
  FileText,
  CheckCircle2,
  Loader2,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { showToasts } from '@/lib/toast-utils'
import { validateFile } from '@/lib/file-validation'
import { useDashboardData } from '@/components/providers/dashboard-data-provider'
import type { AnalysisData } from '@/lib/types/analysis'

function formatUploadDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  })
}

interface UploadMedicalReportProps {
  redirectOnSuccess?: boolean
}

export function UploadMedicalReport({ redirectOnSuccess = true }: UploadMedicalReportProps) {
  const router = useRouter()
  const { stats, refresh } = useDashboardData()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [fileName, setFileName] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [cancelled, setCancelled] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const xhrRef = useRef<XMLHttpRequest | null>(null)
  const lastFailedFileRef = useRef<File | null>(null)

  const recentUploads = stats?.recentUploads ?? []

  const uploadWithProgress = useCallback((file: File, maxRetries = 2): Promise<AnalysisData> => {
    return new Promise((resolve, reject) => {
      let attempts = 0

      const attemptUpload = () => {
        attempts += 1
        const xhr = new XMLHttpRequest()
        xhrRef.current = xhr
        const formData = new FormData()
        formData.append('file', file)

        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            setProgress(Math.round((event.loaded / event.total) * 70))
          }
        })

        xhr.addEventListener('load', () => {
          setProgress(100)
          try {
            const data = JSON.parse(xhr.responseText)
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve(data)
            } else {
              const err = new Error(data.error || 'Analysis failed.')
              if (attempts <= maxRetries) {
                const backoff = 500 * attempts
                setTimeout(attemptUpload, backoff)
              } else {
                reject(err)
              }
            }
          } catch (parseErr) {
            const err = new Error('Invalid server response.')
            if (attempts <= maxRetries) {
              const backoff = 500 * attempts
              setTimeout(attemptUpload, backoff)
            } else {
              reject(err)
            }
          }
        })

        xhr.addEventListener('abort', () => {
          reject(new Error('Upload canceled.'))
        })

        xhr.addEventListener('error', () => {
          if (attempts <= maxRetries) {
            const backoff = 500 * attempts
            setTimeout(attemptUpload, backoff)
          } else {
            reject(new Error('Network error. Please check your connection.'))
          }
        })

        xhr.addEventListener('timeout', () => {
          if (attempts <= maxRetries) {
            const backoff = 500 * attempts
            setTimeout(attemptUpload, backoff)
          } else {
            reject(new Error('Request timed out. Please try a smaller file.'))
          }
        })

        try {
          xhr.open('POST', '/api/analyze-report')
          xhr.timeout = 120000
          xhr.send(formData)
        } catch (err) {
          console.error('Upload start failed', err)
          reject(err instanceof Error ? err : new Error('Upload failed to start'))
        }
      }

      attemptUpload()
    })
  }, [])

  async function handleFile(file: File) {
    const validation = validateFile(file)
    if (!validation.valid) {
      showToasts.error('Invalid file', validation.error)
      return
    }

    // Duplicate detection (best-effort): check local cache of uploaded files
    try {
      const raw = localStorage.getItem('uploadedFiles')
      if (raw) {
        const uploaded: Array<{ name: string; size: number; lastModified: number }> = JSON.parse(raw)
        const match = uploaded.find((u) => u.name === file.name && u.size === file.size)
        if (match) {
          showToasts.info('Duplicate file', 'A file with the same name and size was uploaded before.')
          return
        }
      }
    } catch (err) {
      console.warn('uploadedFiles localStorage parse error', err)
    }

    setLoading(true)
    setProgress(10)
    setFileName(file.name)

    setCancelled(false)
    const toastId = showToasts.loading('Analyzing report', 'AI is reading your medical document...')

    try {
      const data = await uploadWithProgress(file)
      localStorage.setItem('medicalAnalysis', JSON.stringify(data))
      await refresh()

      // record uploaded file metadata for duplicate detection
      try {
        const raw = localStorage.getItem('uploadedFiles')
        const arr: Array<{ name: string; size: number; lastModified: number }> = raw ? JSON.parse(raw) : []
        arr.unshift({ name: file.name, size: file.size, lastModified: file.lastModified })
        // keep only recent 20
        localStorage.setItem('uploadedFiles', JSON.stringify(arr.slice(0, 20)))
      } catch (err) {
        console.warn('Could not update uploadedFiles localStorage', err)
      }

      showToasts.dismiss(toastId)
      showToasts.aiAnalysisComplete()

      if (redirectOnSuccess) {
        router.push('/ai-report-analysis')
      }
    } catch (err) {
      lastFailedFileRef.current = file
      console.error('Upload error:', err)
      showToasts.dismiss(toastId)
      showToasts.error('Analysis failed', err instanceof Error ? err.message : 'Unable to analyze the report.')
    } finally {
      setLoading(false)
      setProgress(0)
    }
  }

  function cancelUpload() {
    if (xhrRef.current) {
      xhrRef.current.abort()
      xhrRef.current = null
      setLoading(false)
      setProgress(0)
      setCancelled(true)
      showToasts.info('Upload canceled', 'The upload was canceled.')
    }
  }

  function onDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    event.stopPropagation()
    setDragActive(false)
    if (loading) return
    const file = event.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && loading) {
        cancelUpload()
      }
      // allow quick retry with Ctrl/Cmd+R when a file failed
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'r' && lastFailedFileRef.current) {
        handleFile(lastFailedFileRef.current)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [loading, handleFile])

  return (
    <Card className="bg-white border-border">
      <CardHeader>
        <CardTitle>Upload Medical Report</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) handleFile(file)
          }}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) handleFile(file)
          }}
        />

        <div
          className={`border-2 border-dashed rounded-xl p-4 sm:p-8 text-center transition cursor-pointer ${
            dragActive
              ? 'border-primary bg-primary/10'
              : 'border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 hover:border-primary/50'
          }`}
          onClick={() => !loading && fileInputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault()
            setDragActive(true)
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={onDrop}
        >
          <Upload className="w-12 h-12 text-primary mx-auto mb-3" />
          <p className="text-sm font-semibold">Drag & drop your report here</p>
          <p className="text-xs text-muted-foreground mt-2">
            or click to browse — PDF, JPG, JPEG, PNG, WEBP (max 10MB)
          </p>

          <div className="flex gap-2 justify-center mt-5 flex-wrap">
            {['PDF', 'JPG', 'PNG', 'WEBP'].map((label) => (
              <span key={label} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                {label}
              </span>
            ))}
          </div>

          {fileName && (
            <p className="mt-4 text-green-600 font-medium">Selected: {fileName}</p>
          )}

          {loading && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm font-medium">Analyzing with Gemini AI...</span>
              </div>
              <div className="w-full bg-muted h-2 rounded-full overflow-hidden max-w-xs mx-auto">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            className="flex-1"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
          >
            <Upload className="w-4 h-4 mr-2" />
            {loading ? 'Analyzing...' : 'Browse & Upload'}
          </Button>

          <Button
            variant="outline"
            className="flex-1"
            onClick={() => cameraInputRef.current?.click()}
            disabled={loading}
          >
            <Camera className="w-4 h-4 mr-2" />
            Take Photo
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold">Recent Uploads</p>

          {recentUploads.length === 0 ? (
            <p className="text-sm text-muted-foreground p-3 bg-muted/30 rounded-lg border">
              No uploads yet. Upload your first medical report to get AI insights.
            </p>
          ) : (
            recentUploads.map((upload) => (
              <div
                key={upload.id}
                className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border"
              >
                <FileText className="w-4 h-4 text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{upload.fileName}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatUploadDate(upload.createdAt)} • {upload.status}
                  </p>
                </div>
                {upload.status === 'COMPLETED' && (
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
