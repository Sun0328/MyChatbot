'use client'
import ReactMarkdown from 'react-markdown'
import { useChatStore } from '@/store/chat-store'
import { useJobStore } from '@/store/job-store'

export default function ChatArea({ botType }) {
  const isJobBot = botType === 'jobTracker'

  const userMessages = isJobBot
    ? useJobStore((s) => s.userMessages)
    : useChatStore((s) => s.userMessages)

  const responses = isJobBot
    ? useJobStore((s) => s.responses)
    : useChatStore((s) => s.responses)

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-white max-h-[calc(100vh-200px)]">
      {responses[0] && (
        <div className="text-left border rounded-lg p-2 bg-gray-100">
          <div className="text-violet-600">Bot:</div>
          <ReactMarkdown>{responses[0]}</ReactMarkdown>
        </div>
      )}

      {userMessages.map((msg, index) => (
        <div key={index}>
          <div className="text-right mb-2">
            <strong>You:</strong>
            <div className="text-gray-800">{msg}</div>
          </div>
          {responses[index + 1] && (
            <div className="text-left border rounded-lg p-2 bg-gray-100">
              <div className="text-violet-600">Bot:</div>
              <ReactMarkdown>{responses[index + 1]}</ReactMarkdown>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
