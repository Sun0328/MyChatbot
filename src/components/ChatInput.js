'use client'
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export default function ChatInput({ input, setInput, onSend, isLoading }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <form className="px-4 py-4 bg-white flex gap-2 rounded-2xl">
      <Input
        className="focus-visible:ring-violet-300 focus-visible:ring-2 focus-visible:ring-offset-0"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={isLoading}
      />
      <Button
        type="button"
        onClick={onSend}
        disabled={isLoading}
        className="h-full bg-violet-600 text-white cursor-pointer hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </Button>
    </form>
  )
}
