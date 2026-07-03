import { prisma } from '@/lib/prisma'

export type ChatRole = 'user' | 'assistant' | 'system'

export interface ChatMessage {
  id: string
  userId?: string
  role: ChatRole
  message: string
  timestamp: string
}

export interface ChatCreatePayload {
  userId?: string
  role: ChatRole
  message: string
}

export async function createChatMessage(payload: ChatCreatePayload): Promise<ChatMessage> {
  const created = await prisma.chat.create({
    data: {
      userId: payload.userId,
      role: payload.role,
      message: payload.message,
    },
  })

  return {
    id: created.id,
    userId: created.userId ?? undefined,
    role: created.role,
    message: created.message,
    timestamp: created.timestamp.toISOString(),
  }
}

export async function getChatHistory(userId?: string): Promise<ChatMessage[]> {
  const chats = await prisma.chat.findMany({
    where: userId ? { userId } : undefined,
    orderBy: { timestamp: 'asc' },
    take: 100,
  })

  return chats.map((chat) => ({
    id: chat.id,
    userId: chat.userId ?? undefined,
    role: chat.role,
    message: chat.message,
    timestamp: chat.timestamp.toISOString(),
  }))
}
