import { NewsInfo } from '@/lib/api/market-aux'
import { create } from 'zustand'
import { getNewsInfoFromMarketaux } from '@/lib/api/market-aux'

interface BrowseState {
  browse: NewsInfo[] | null
  setBrowse: () => Promise<void>
  browseLoading: boolean
}

const useBrowseStore = create<BrowseState>((set) => ({
  browse: null,
  setBrowse: async () => {
    set({ browseLoading: true })
    try {
      const data = await getNewsInfoFromMarketaux("en")
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
