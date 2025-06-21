import { NextResponse } from 'next/server'
import { prompts_job } from '@/utils/prompts'

export async function POST(req) {
  try {
    const { url } = await req.json()
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }
    
    console.log('Received job URL:', url);
    
    // 1. use ScraperAPI to scrape the job listing URL
    const scraperApiUrl = `http://localhost:3000/api/scraper?url=${encodeURIComponent(url)}`

    let scrapedContent = ''
    try {
      const scrapeRes = await fetch(scraperApiUrl)
      if (!scrapeRes.ok) {
        throw new Error(`Scraper API failed with status: ${scrapeRes.status}`)
      }
      const scrapeData = await scrapeRes.json()
      scrapedContent = scrapeData.content || ''
      console.log('Scraped content length:', scrapedContent.length);
      console.log('Scraped content:', scrapedContent);
    } catch (error) {
      console.error('Scraper error:', error);
      return NextResponse.json({ error: 'Failed to scrape job content', details: error.message }, { status: 500 })
    }

    // 2. construct the prompt using the scraped content
    const prompt = prompts_job(scrapedContent)

    // 3. use Gemini API to process the prompt
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 })
    }
    
    const llmUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`

    const response = await fetch(llmUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    })

    if (!response.ok) {
      throw new Error(`Gemini API failed with status: ${response.status}`)
    }

    const result = await response.json()
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response'

    console.log('Gemini response received');

    return NextResponse.json({ message: text })
  } catch (err) {
    console.error('Job API error:', err);
    return NextResponse.json({ error: 'Job processing failed', details: err.message }, { status: 500 })
  }
}
