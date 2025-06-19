'use client'
import { useState } from 'react'
import Header from '../components/Header'
import ChatArea from '../components/ChatArea'
import ChatInput from '../components/ChatInput'
import { PaperAirplaneIcon, PaperClipIcon, FaceSmileIcon } from '@heroicons/react/24/solid'

export default function Home() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
  if (!input.trim()) return
  const userMessage = { role: 'user', content: input }
  const thinkingMessage = { role: 'assistant', content: '💭 Thinking...' }

  setMessages(prev => [...prev, userMessage, thinkingMessage])
  setInput('')

  // const res = await fetch('/api/chat', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ messages: [...messages, userMessage] })
  // })
  // const data = await res.json()

  // 替换掉最后一个“Thinking...”为真实回答
  setMessages(prev => [
    ...prev.slice(0, -1),
    { role: 'assistant', content: data.message }
  ])
}


  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ece9fc] to-[#d6e0fc] p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl flex flex-col h-[600px]">
        <Header />
        <ChatArea messages={messages} />
        <ChatInput input={input} setInput={setInput} onSend={sendMessage} isLoading={isLoading} />
      </div>
    </main>
  )
}
