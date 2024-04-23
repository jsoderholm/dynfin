import { create } from 'zustand'
import { addCompanyToSaved, removeCompanyFromSaved, fetchSavedCompanies } from '@/lib/db.ts'

interface SavedState {
  saved: {
    symbol: string
    name: string
  }[]
  setSaved: (symbols: string[]) => Promise<void>
  addSaved: (userID: string, item: { symbol: string; name: string }) => Promise<void>
  removeSaved: (userID: string, symbol: string) => Promise<void>
  savedLoading: boolean
}

const useSavedStore = create<SavedState>((set, get) => ({
  saved: [],
  setSaved: async (userId: string) => {
    set({ savedLoading: true })
    try {
      const saved = await fetchSavedCompanies(userId)
      set({ saved })
    } catch (error) {
      console.error('Failed to fetch saved list:', error)
    } finally {
      set({ savedLoading: false })
    }
  },
  savedLoading: false,

  addSaved: async (userId: string, item) => {
    await addCompanyToSaved(userId, item)
    await get().setSaved(userId) // Refresh the saved items from Firebase
  },
  removeSaved: async (userId: string, symbol: string) => {
    await removeCompanyFromSaved(userId, symbol)
    await get().setSaved(userId) // Refresh the saved items from Firebase
  },
}))

export default useSavedStore
