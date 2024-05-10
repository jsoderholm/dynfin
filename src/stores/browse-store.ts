import { Option } from '@/components/ui/multiple-selector'
import { CombinedInfo, getCombinedInfoFromStockNews } from '@/lib/api/stock-news'
import { COLLECTIONS, COUNTRIES, INDUSTRIES, SECTORS } from '@/lib/browse-filtering'

import { create } from 'zustand'

export type Filter = {
  topics: Option[]
  sector: Option
  industry: Option
  country: Option
  collection: Option
}

interface BrowseState {
  browse: CombinedInfo[] | null
  setBrowse: (page: number, filter: Filter) => Promise<void>
  browseLoading: boolean
  currentPage: number
  setPage: (page: number) => void
  currentTab: string
  setTab: (tab: string) => void
  currentFilter: Filter
  setFilter: (filter: Filter) => void
}

const useBrowseStore = create<BrowseState>((set) => ({
  browse: null,
  setBrowse: async (page, filter) => {
    set({ browseLoading: true })
    try {
      const data = await getCombinedInfoFromStockNews(page, filter)

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
  currentFilter: {
    topics: [],
    sector: SECTORS[0],
    industry: INDUSTRIES[0],
    country: COUNTRIES[0],
    collection: COLLECTIONS[0],
  },
  setFilter: (filter: Filter) => set({ currentFilter: filter }),
}))

export default useBrowseStore
