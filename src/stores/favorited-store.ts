import create from 'zustand'
import useSavedStore from '@/stores/saved-store.ts'

interface FavoriteState {
  favorites: Set<string>
  toggleFavorite: (symbol: string, name: string) => void
  isFavorited: (symbol: string) => boolean
}

const useFavoritesStore = create<FavoriteState>((set, get) => ({
  favorites: new Set(),

  toggleFavorite: (symbol, name) =>
    set((state) => {
      const newFavorites = new Set(state.favorites)
      if (newFavorites.has(symbol)) {
        newFavorites.delete(symbol)
        useSavedStore.getState().removeSaved(symbol)
      } else {
        newFavorites.add(symbol)
        useSavedStore.getState().addSaved({ symbol, name })
      }
      return { favorites: newFavorites }
    }),

  isFavorited: (symbol: string) => get().favorites.has(symbol),
}))

export default useFavoritesStore
