import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { url } = await req.json()
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Ensure URL has protocol
    const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`
    
    // Test if URL is accessible
    const response = await fetch(urlWithProtocol, {
      method: 'HEAD',
      redirect: 'follow',
      timeout: 10000, // 10 second timeout
    })

    const isValid = response.ok // 200-299 status codes
    const statusCode = response.status

    return NextResponse.json({ 
      isValid, 
      statusCode,
      url: urlWithProtocol 
    })
  } catch (error) {
    console.error('URL validation error:', error)
    return NextResponse.json({ 
      isValid: false, 
      statusCode: null,
      error: error.message 
    })
  }
} 