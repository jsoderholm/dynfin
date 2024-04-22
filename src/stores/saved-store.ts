import { create } from 'zustand'

interface SavedState {
  saved: {
    symbol: string
    name: string
  }[]
  setSaved: (symbols: string[]) => Promise<void>
  savedLoading: boolean
}

const useSavedStore = create<SavedState>((set) => ({
  saved: [],
  addSaved: (item) =>
    set((state) => ({
      saved: [...state.saved, item],
    })),
  removeSaved: (symbol) =>
    set((state) => ({
      saved: state.saved.filter((s) => s.symbol !== symbol),
    })),
  setSaved: async () => {
    set({ savedLoading: true })
    try {
      const response = await fetch('/saved.json')
      const saved = await response.json()
      set({ saved })
    } catch (error) {
      console.error('Failed to fetch saved list:', error)
    } finally {
      set({ savedLoading: false })
    }
  },
  savedLoading: false,
}))

export default useSavedStore
