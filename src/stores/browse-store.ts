import { CombinedInfo, getCombinedInfoFromStockNews } from '@/lib/api/stock-news'
import { create } from 'zustand'

interface BrowseState {
  browse: CombinedInfo[] | null
  setBrowse: (page: number, saved: string[]) => Promise<void>
  browseLoading: boolean
  currentPage: number
  setPage: (page: number) => void
  currentTab: string
  setTab: (tab: string) => void
}

const useBrowseStore = create<BrowseState>((set) => ({
  browse: null,
  setBrowse: async (page, saved) => {
    set({ browseLoading: true })
    try {
      const data = await getCombinedInfoFromStockNews(page, saved)

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
  currentTab: 'all',
  setTab: (tab) => set({ currentTab: tab }),
}))

export default useBrowseStore
