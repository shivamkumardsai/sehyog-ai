'use client'

import { Toaster } from 'sonner'

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      theme="light"
      closeButton
      toastOptions={{
        classNames: {
          toast: 'bg-white border border-border shadow-lg rounded-xl',
          title: 'text-sm font-semibold text-foreground',
          description: 'text-xs text-muted-foreground mt-1',
          actionButton: 'bg-primary text-white hover:bg-primary/90',
          cancelButton: 'bg-muted text-foreground hover:bg-muted/80',
          closeButton: 'text-muted-foreground hover:text-foreground',
        },
        duration: 4000,
      }}
      style={{
        fontFamily: 'inherit',
      }}
    />
  )
}
