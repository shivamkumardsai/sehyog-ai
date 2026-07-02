import { NextResponse } from 'next/server'

export interface UserProfile {
  id: string
  name: string
  email: string
}

export async function getSessionUser(): Promise<UserProfile> {
  return {
    id: 'demo-user',
    name: 'Shivam kumar',
    email: 'shivam@example.com',
  }
}

export function unauthorized() {
  return NextResponse.json(
    { error: 'Unauthorized' },
    { status: 401 }
  )
}

export const unauthorizedResponse = unauthorized
