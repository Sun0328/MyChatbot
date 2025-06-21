import { create } from 'zustand'

export const useJobStore = create((set) => ({
  input: '',
  userMessages: [],
  responses:['👋 I’m your job tracker assistant. Paste the job post url, and I’ll help you extract important info from job listings.'],
  isLoading: false,

  setInput: (val) => set({ input: val }),
  setUserMessages: (msgs) => set({ userMessages: msgs }), 
  setResponses: (resps) => set({ responses: resps }),
  setLoading: (flag) => set({ isLoading: flag }),
}))
