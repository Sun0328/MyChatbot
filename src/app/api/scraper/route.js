import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const targetUrl = searchParams.get('url')
  
  if (!targetUrl) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
  }

  const apiKey = process.env.SCRAPER_API_KEY

  const scrapeUrl = `https://api.scraperapi.com/?api_key=${apiKey}&url=${encodeURIComponent(targetUrl)}&output_format=markdown`

  try {
    const response = await fetch(scrapeUrl)
    const markdownContent = await response.text()

    return NextResponse.json({ content: markdownContent })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to scrape content', details: error.message }, { status: 500 })
  }
}
