import { NextResponse } from 'next/server'

export async function POST(req) {
  const { prompt } = await req.json()

  const apiKey = process.env.GEMINI_API_KEY
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  })

  const result = await response.json()
  const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response'

  return NextResponse.json({ message: text })
}
