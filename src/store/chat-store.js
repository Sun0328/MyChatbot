import { create } from 'zustand'

export const useChatStore = create((set) => ({
  input: '',
  userMessages: [],
  responses:[],
  isLoading: false,

  setInput: (val) => set({ input: val }),
  setUserMessages: (msgs) => set({ userMessages: msgs }), 
  setResponses: (resps) => set({ responses: resps }),
  setLoading: (flag) => set({ isLoading: flag }),
}))
