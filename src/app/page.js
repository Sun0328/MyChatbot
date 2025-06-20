'use client'
import Header from '../components/Header'
import ChatArea from '../components/ChatArea'
import ChatInput from '../components/ChatInput'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ece9fc] to-[#d6e0fc] p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl flex flex-col h-[90vh]">
        <Header />
        <ChatArea />
        <ChatInput />
      </div>
    </main>
  )
}
