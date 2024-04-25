import { create } from 'zustand'
import { addCompanyToSaved, removeCompanyFromSaved, fetchSavedCompanies } from '@/lib/db.ts'

interface SavedState {
  saved: Set<{
    symbol: string
    name: string
  }>
  savedLoading: boolean
  setSaved: (userID: string) => Promise<void>
  addSaved: (userID: string, item: { symbol: string; name: string }) => Promise<void>
  removeSaved: (userID: string, symbol: string) => Promise<void>
  toggleFavorite: (userId: string, symbol: string, name: string) => void
  isFavorited: (symbol: string) => boolean
}

const useSavedStore = create<SavedState>((set, get) => ({
  saved: new Set(),
  savedLoading: false,

  setSaved: async (userId: string) => {
    set({ savedLoading: true })
    try {
      const savedCompanies = await fetchSavedCompanies(userId)
      const savedSet = new Set(savedCompanies.map((company) => ({ symbol: company.symbol, name: company.name })))
      set({ saved: savedSet })
    } catch (error) {
      console.error('Failed to fetch saved list:', error)
    } finally {
      set({ savedLoading: false })
    }
  },

  addSaved: async (userId: string, item: { symbol: string; name: string }) => {
    await addCompanyToSaved(userId, item.symbol)
    await get().setSaved(userId) // Refresh the saved items from Firebase
  },

  removeSaved: async (userId: string, symbol: string) => {
    await removeCompanyFromSaved(userId, symbol)
    await get().setSaved(userId) // Refresh the saved items from Firebase
  },

  toggleFavorite: (userId: string, symbol: string, name: string) =>
    set((state) => {
      const newSaved = new Map(state.saved)
      if (newSaved.has(symbol)) {
        newSaved.delete(symbol)
        removeCompanyFromSaved(userId, symbol)
      } else {
        newSaved.set(symbol, name)
        addCompanyToSaved(userId, symbol)
      }
      return { saved: newSaved }
    }),

  isFavorited: (symbol: string) => get().favorites.has(symbol),
}))

export default useSavedStore
