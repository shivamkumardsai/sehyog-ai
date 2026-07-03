import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { createChatMessage, type ChatCreatePayload } from '@/lib/chat'

interface ChatRequestBody {
  userId?: string
  message: string
}

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured. Add it to your environment variables.')
  }
  return new GoogleGenAI({ apiKey })
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequestBody

    if (!body || typeof body.message !== 'string' || !body.message.trim()) {
      return NextResponse.json({ error: 'Request body must include a non-empty message string.' }, { status: 400 })
    }

    const userMessage: ChatCreatePayload = {
      userId: body.userId,
      role: 'user',
      message: body.message.trim(),
    }

    await createChatMessage(userMessage)

    const aiClient = getGeminiClient()
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: body.message.trim() }],
        },
      ],
    })

    const aiText = response.text?.trim() || ''
    if (!aiText) {
      return NextResponse.json({ error: 'Gemini returned an empty response.' }, { status: 502 })
    }

    const aiMessage: ChatCreatePayload = {
      role: 'assistant',
      message: aiText,
    }

    await createChatMessage(aiMessage)

    return NextResponse.json({
      ok: true,
      userMessage: userMessage.message,
      assistantMessage: aiText,
    })
  } catch (error) {
    console.error('Chat API error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function GET() {
  try {
    return NextResponse.json({ status: 'API is working', message: 'Use POST to send chat messages.' })
  } catch (error) {
    console.error('Chat GET error:', error)
    return NextResponse.json({ status: 'error', message: 'Failed to respond' }, { status: 500 })
  }
}
