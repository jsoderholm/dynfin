import { create } from 'zustand'
import { addCompanyToSaved, removeCompanyFromSaved, fetchSavedCompanies } from '@/lib/db.ts'

interface SavedState {
  saved: {
    symbol: string
    name: string
  }[]
  favorites: Map<string, string>
  savedLoading: boolean
  setSaved: (userID: string) => Promise<void>
  addSaved: (userID: string, item: { symbol: string; name: string }) => Promise<void>
  removeSaved: (userID: string, symbol: string) => Promise<void>
  toggleFavorite: (userId: string, symbol: string, name: string) => void
  isFavorited: (symbol: string) => boolean
}

const useSavedStore = create<SavedState>((set, get) => ({
  saved: [],
  favorites: new Map<string, string>(),
  savedLoading: false,

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
      const newFavorites = new Map(state.favorites)
      if (newFavorites.has(symbol)) {
        newFavorites.delete(symbol)
        removeCompanyFromSaved(userId, symbol)
      } else {
        newFavorites.set(symbol, name)
        addCompanyToSaved(userId, symbol)
      }
      return { favorites: newFavorites }
    }),

  isFavorited: (symbol: string) => get().favorites.has(symbol),
}))

export default useSavedStore
