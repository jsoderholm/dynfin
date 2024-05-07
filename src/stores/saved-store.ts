import { create } from 'zustand'
import { addCompanyToSaved, removeCompanyFromSaved, fetchSavedCompanies } from '@/lib/db.ts'

interface SavedState {
  saved: Set<{
    symbol: string
    name: string
  }>
  savedLoading: boolean
  setSaved: (userID: string) => Promise<void>
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
      const savedSet = new Set(
        savedCompanies.map((company) => ({
          symbol: company.symbol,
          name: company.name,
        })),
      )
      set({ saved: savedSet })
    } catch (error) {
      console.error('Failed to fetch saved list:', error)
    } finally {
      set({ savedLoading: false })
    }
  },

  toggleFavorite: (userId: string, symbol: string, name: string) =>
    set((state) => {
      const newSaved = new Set([...state.saved])
      const itemExists = [...newSaved].find((item) => item.symbol === symbol)

      if (itemExists) {
        newSaved.delete(itemExists)
        removeCompanyFromSaved(userId, symbol)
      } else {
        newSaved.add({ symbol, name })
        addCompanyToSaved(userId, symbol)
      }
      return { saved: newSaved }
    }),

  isFavorited: (symbol: string) => {
    const saved = get().saved
    return Array.from(saved).some((item) => item.symbol === symbol)
  },
}))

export default useSavedStore
