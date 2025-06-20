import { create } from 'zustand'

export const useChatStore = create((set) => ({
  input: '',
  userMessages: [],
  responses:['👋 Hi, I am your chatbot assistant. How can I help you today?'],
  isLoading: false,

  setInput: (val) => set({ input: val }),
  setUserMessages: (msgs) => set({ userMessages: msgs }), 
  setResponses: (resps) => set({ responses: resps }),
  setLoading: (flag) => set({ isLoading: flag }),
}))
