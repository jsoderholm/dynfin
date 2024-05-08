import { Option } from '@/components/ui/multiple-selector'
import { CombinedInfo, getCombinedInfoFromStockNews } from '@/lib/api/stock-news'

import { create } from 'zustand'

interface BrowseState {
  browse: CombinedInfo[] | null
  setBrowse: (page: number, topics: Option[]) => Promise<void>
  browseLoading: boolean
  currentPage: number
  setPage: (page: number) => void
  currentTab: string
  setTab: (tab: string) => void
  currentTopics: Option[]
  setTopics: (topics: Option[]) => void
  currentSector: Option
  setSector: (sector: Option) => void
}

const startingSector: Option = { label: 'All Sectors', value: 'all', group: 'Sectors' }

const useBrowseStore = create<BrowseState>((set) => ({
  browse: null,
  setBrowse: async (page, topics) => {
    set({ browseLoading: true })
    try {
      const data = await getCombinedInfoFromStockNews(page, topics)

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
  currentTopics: [],
  setTopics: (topics) => set({ currentTopics: topics }),
  currentSector: startingSector,
  setSector: (sector: Option) => set({ currentSector: sector }),
}))

export default useBrowseStore
