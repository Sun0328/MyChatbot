import { NextResponse } from 'next/server'

export async function POST(req) {
  const body = await req.json()

  const response = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama3:8b',
      messages: body.messages,
      stream: false,
    }),
  })

  const result = await response.json()
  const message = result.message?.content || 'No response.'

  return NextResponse.json({ message })
}
