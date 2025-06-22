'use client'
import { useJobStore } from '@/store/job-store'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import cleanJsonData from '@/utils/cleanjsondata'
import { checkUrlFormat } from '@/utils/checkurlvalid'
import checkUrlValid from '@/utils/checkurlvalid'
import { toast } from 'sonner'

export default function JobInput() {
  const input = useJobStore((s) => s.input)
  const setInput = useJobStore((s) => s.setInput)
  const isLoading = useJobStore((s) => s.isLoading)
  const setLoading = useJobStore((s) => s.setLoading)
  const userMessages = useJobStore((s) => s.userMessages)
  const setUserMessages = useJobStore((s) => s.setUserMessages)
  const responses = useJobStore((s) => s.responses)
  const setResponses = useJobStore((s) => s.setResponses)

  
  const sendMessage = async () => {
    if (!input.trim()) return

    // Validate URL format first
    if (!checkUrlFormat(input)) {
      toast.error("Please paste the url only.")
      return
    }

    // Validate URL accessibility before sending to job API
    const isUrlAccessible = await checkUrlValid(input);
    if (!isUrlAccessible) {
      toast.error("This URL is not accessible.");
      return;
    }
    
    const newUserMessages = [...userMessages, input]
    setUserMessages(newUserMessages)
    setInput('')
    setLoading(true)
    setResponses([...responses, 'Researching...'])

    try {
      console.log('Sending job URL:', input);
      
      const res = await fetch('/api/job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: input }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const result = data.message || '⚠️ No response.';

      const formattedResult = await cleanJsonData(result);
      setResponses([...responses, formattedResult]);

    } catch (error) {
      toast.error(`Error: ${error.message}`);
      setResponses([...responses, `⚠️ Error: ${error.message}`]);
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
        placeholder={isLoading ? 'Extracting job info...' : 'Paste a job link here...'}
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
