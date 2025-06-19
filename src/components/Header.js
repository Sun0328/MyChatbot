export default function Header() {
  return (
    <div className="bg-violet-600 rounded-t-2xl px-6 py-4 flex items-center justify-start">
      <h1 className="text-white text-xl">
        <img 
        src="/icons/smart_toy.svg" 
        alt="Smart Toy Icon" 
        className="inline-block w-6 h-6 mr-4" 
        />
        Local Chatbot
      </h1>
    </div>
  )
}
