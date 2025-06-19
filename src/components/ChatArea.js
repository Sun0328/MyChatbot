export default function ChatArea({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-white">
      {messages.map((m, i) => (
        <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
          <p>
            <strong>{m.role === 'user' ? 'You' : 'Bot'}:</strong> {m.content}
          </p>
        </div>
      ))}
    </div>
  )
}
