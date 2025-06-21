'use client'
import Header from '../../components/Header'
import ChatArea from '../../components/ChatArea'
import JobInput from '../../components/JobInput'

export default function page() {
  return (
    <div className='flex flex-col h-full max-w-2xl w-full'>
      <Header botName="Job Tracker Bot"/>
      <ChatArea botType="jobTracker"/>
      <JobInput />
    </div>
  )
}
