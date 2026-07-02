export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
] as const

export const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png', '.webp'] as const

export type AllowedMimeType = (typeof ALLOWED_MIME_TYPES)[number]

export function normalizeMimeType(file: File): string {
  const extension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'))
  if (file.type === 'image/jpg' || extension === '.jpg') {
    return 'image/jpeg'
  }

  const explicitMap: Record<string, string> = {
    '.pdf': 'application/pdf',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
  }

  return file.type || explicitMap[extension] || 'application/octet-stream'
}

export function validateFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file provided.' }
  }

  if (!file.name || !file.name.trim()) {
    return { valid: false, error: 'File name is missing or invalid.' }
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`,
    }
  }

  const mimeType = normalizeMimeType(file)
  const extension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'))

  const mimeValid = ALLOWED_MIME_TYPES.includes(mimeType as AllowedMimeType)
  const extValid = ALLOWED_EXTENSIONS.includes(extension as (typeof ALLOWED_EXTENSIONS)[number])

  if (!mimeValid || !extValid) {
    return {
      valid: false,
      error: 'Unsupported file type. Please upload PDF, JPG, JPEG, PNG, or WEBP.',
    }
  }

  return { valid: true }
}

export function isPdfFile(file: File): boolean {
  return (
    normalizeMimeType(file) === 'application/pdf' ||
    file.name.toLowerCase().endsWith('.pdf')
  )
}

export function isImageFile(file: File): boolean {
  const mimeType = normalizeMimeType(file)
  return (
    mimeType.startsWith('image/') ||
    ['.jpg', '.jpeg', '.png', '.webp'].some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    )
  )
}
