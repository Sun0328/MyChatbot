'use client'
export default function Header({botName}) {
  return (
    <div className="bg-violet-600 rounded-t-2xl px-6 py-4 flex items-center justify-start">
      <h1 className="text-white text-xl">
        <img 
        src="/icons/smart_toy.svg" 
        alt="Smart Toy Icon" 
        className="inline-block w-6 h-6 mr-4" 
        />
        My {botName}
      </h1>
    </div>
  )
}
