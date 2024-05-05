import { CombinedInfo, getCombinedInfoFromStockNews } from '@/lib/api/stock-news'
import { create } from 'zustand'

interface BrowseState {
  browse: CombinedInfo[] | null
  setBrowse: () => Promise<void>
  browseLoading: boolean
}

const useBrowseStore = create<BrowseState>((set) => ({
  browse: null,
  setBrowse: async () => {
    set({ browseLoading: true })
    try {
      const data = await getCombinedInfoFromStockNews([])

      set({ browse: data })
    } catch (error) {
      console.error('Failed to fetch browse list:', error)
    } finally {
      set({ browseLoading: false })
    }
  },
  browseLoading: false,
}))

export default useBrowseStore
