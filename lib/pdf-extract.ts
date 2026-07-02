import pdfParse from 'pdf-parse'

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  const data = await pdfParse(buffer)
  const text = typeof data.text === 'string' ? data.text.trim() : ''

  if (!text || text.length < 10) {
    throw new Error(
      'Could not extract readable text from PDF. The file may be scanned or image-based — try uploading as an image instead.'
    )
  }

  return text
}
