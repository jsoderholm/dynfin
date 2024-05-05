import { CombinedInfo, getCombinedInfoFromStockNews } from '@/lib/api/stock-news'
import { create } from 'zustand'

interface BrowseState {
  browse: CombinedInfo[] | null
  setBrowse: (page: number) => Promise<void>
  browseLoading: boolean
  currentPage: number
  setPage: (page: number) => void
}

const useBrowseStore = create<BrowseState>((set) => ({
  browse: null,
  setBrowse: async (page) => {
    set({ browseLoading: true })
    try {
      const data = await getCombinedInfoFromStockNews(page, [])

      set({ browse: data })
    } catch (error) {
      console.error('Failed to fetch browse list:', error)
    } finally {
      set({ browseLoading: false })
    }
  },
  browseLoading: false,
  currentPage: 1,
  setPage: (page) => set({ currentPage: page }),
}))

export default useBrowseStore
