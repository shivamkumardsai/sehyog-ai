import { toast } from 'sonner'

export const showToasts = {
  success: (title: string, description?: string) => {
    toast.success(title, {
      description,
    })
  },

  error: (title: string, description?: string) => {
    toast.error(title, {
      description,
    })
  },

  info: (title: string, description?: string) => {
    toast.info(title, {
      description,
    })
  },

  loading: (title: string, description?: string) => {
    return toast.loading(title, {
      description,
    })
  },

  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string
      error: string
    }
  ) => {
    toast.promise(promise, messages)
  },

  // Specific notification types for SEHYOG AI
  reportUploaded: () => {
    showToasts.success('Report Uploaded Successfully', 'Your medical report has been saved.')
  },

  aiAnalysisComplete: () => {
    showToasts.success('AI Analysis Complete', 'Your report analysis is ready.')
  },

  medicineReminderSaved: () => {
    showToasts.success('Medicine Reminder Saved', 'Reminder has been scheduled.')
  },

  recoveryUpdated: () => {
    showToasts.success('Recovery Updated', 'Your recovery progress has been recorded.')
  },

  emergencyAlertSent: () => {
    showToasts.success('Emergency Alert Sent', 'Contacts have been notified.')
  },
}
