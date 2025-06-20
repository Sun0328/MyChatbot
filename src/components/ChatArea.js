import ReactMarkdown from 'react-markdown'
import { useChatStore } from '@/store/chat-store'

export default function ChatArea() {
  const userMessages = useChatStore((s) => s.userMessages)
  const responses = useChatStore((s) => s.responses)

  // console.log('userMessages:', userMessages);
  // console.log('responses:', responses);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-white">
      {userMessages.map((userMsg, index) => (
        <div key={index}>
          <div className="text-right">
              <strong>You:</strong>
              <div className='text-gray-800'>{userMsg}</div>
          </div>
          {responses[index] && (
            <div className="text-left border-1 rounded-lg p-2 mt-2 bg-gray-100">
                <div className='text-violet-600'>Bot:</div>
                <ReactMarkdown>{responses[index]}</ReactMarkdown>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
