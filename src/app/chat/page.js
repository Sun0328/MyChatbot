import Header from '@/components/Header'
import ChatArea from '@/components/ChatArea'
import ChatInput from '@/components/ChatInput'

export default function ChatPage() {
  return (
    <div className='flex flex-col h-full max-w-2xl w-full'>
      <Header botName="Chat Bot"/>
      <ChatArea botType="chatBot"/>
      <ChatInput />
    </div>
  )
}
