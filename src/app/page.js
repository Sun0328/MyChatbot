'use client'

import { redirect } from 'next/navigation'

export default function Home() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="text-4xl text-gray-700 font-bold mb-4">Welcome to Fiona's Trained Bots</h1>
      <p className="text-lg text-gray-600 mb-8">Choose a bot to get started</p>
      <div className="flex justify-center space-x-4">
        <a 
          href="/chat" 
          className="clickable-btn"
        >
          Chat Bot
        </a>
        <a 
          href="/jobtracker" 
          className="clickable-btn"
        >
          Job Tracker Bot
        </a>
        <a 
          href="/stock" 
          className="clickable-btn"
        >
          US Stock Bot
        </a>
      </div>
    </div>
  )
}