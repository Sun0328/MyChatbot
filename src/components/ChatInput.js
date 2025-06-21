'use client'
import { useChatStore } from '@/store/chat-store'
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export default function ChatInput() {
  const input = useChatStore((s) => s.input)
  const setInput = useChatStore((s) => s.setInput)
  const isLoading = useChatStore((s) => s.isLoading)
  const setLoading = useChatStore((s) => s.setLoading)
  const userMessages = useChatStore((s) => s.userMessages)
  const setUserMessages = useChatStore((s) => s.setUserMessages)
  const responses = useChatStore((s) => s.responses)
  const setResponses = useChatStore((s) => s.setResponses)

  const sendMessage = async () => {
    if (!input.trim()) return

    const newUserMessages = [...userMessages, input]
    setUserMessages(newUserMessages)
    setInput('')
    setLoading(true)
    setResponses([...responses, 'Thinking...']) // Add empty response for loading state

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      const reply = {
        role: 'assistant',
        content: data.message || '⚠️ No response.',
      };

      // console.log('Response from API:', reply.content);
      setResponses([...responses, reply.content]);
      
    } catch (error) {
      console.log('Error fetching response:', error);
    } finally {
      setLoading(false);
    }
  }

  const stopGenerate = () => setLoading(false)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <form className="px-4 py-4 bg-white flex gap-2 rounded-b-2xl">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isLoading ? 'Generating response...' : 'Type your message...'}
        disabled={isLoading}
        className="focus-visible:ring-violet-300 focus-visible:ring-2 focus-visible:ring-offset-0"
      />
      <Button
        type="button"
        onClick={isLoading ? stopGenerate : sendMessage}
        className={`h-full text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
          isLoading ? 'bg-red-500 hover:bg-red-600' : 'bg-violet-600 hover:bg-violet-700'
        }`}
      >
        {isLoading ? (
          <img src="/icons/stop_circle.svg" alt="Stop" className="w-5 h-5" />
        ) : (
          'Send'
        )}
      </Button>
    </form>
  )
}