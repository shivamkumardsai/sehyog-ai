import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs'

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  const loadingTask = pdfjs.getDocument({
    data: new Uint8Array(buffer),
    useSystemFonts: true,
  })

  const pdf = await loadingTask.promise
  const pages: string[] = []

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum)
    const textContent = await page.getTextContent()
    const pageText = textContent.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ')
    pages.push(pageText)
  }

  const text = pages.join('\n').trim()

  if (!text || text.length < 10) {
    throw new Error(
      'Could not extract readable text from PDF. The file may be scanned or image-based — try uploading as an image instead.'
    )
  }

  return text
}
