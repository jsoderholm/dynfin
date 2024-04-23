import { create } from 'zustand'
import useSavedStore from '@/stores/saved-store.ts'

interface FavoriteState {
  favorites: Map<string, string>
  toggleFavorite: (userId: string, symbol: string, name: string) => void
  isFavorited: (symbol: string) => boolean
}

const useFavoritesStore = create<FavoriteState>((set, get) => ({
  favorites: new Map<string, string>(),

  toggleFavorite: (userId: string, symbol: string, name: string) =>
    set((state) => {
      const newFavorites = new Map(state.favorites)
      if (newFavorites.has(symbol)) {
        newFavorites.delete(symbol)
        useSavedStore.getState().removeSaved(userId, symbol)
      } else {
        newFavorites.set(symbol, name)
        useSavedStore.getState().addSaved(userId, { symbol, name })
        console.log('saved item')
      }
      return { favorites: newFavorites }
    }),

  isFavorited: (symbol: string) => get().favorites.has(symbol),
}))

export default useFavoritesStore
