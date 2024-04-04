import { CompanyProfile, GraphInfo } from '@/lib/api/finage'
import { NewsInfo } from '@/lib/api/market-aux'
import { create } from 'zustand'

interface DetailsState {
  companyProfile: CompanyProfile | null
  setCompanyProfile: () => Promise<void>
  companyProfileLoading: boolean

  graphInfo: GraphInfo | null
  setGraphInfo: () => Promise<void>
  graphInfoLoading: boolean

  newsListInfo: NewsInfo[] | null
  setNewsListInfo: () => Promise<void>
  newsListLoading: boolean
}

const useDetailsStore = create<DetailsState>((set) => ({
  companyProfile: null,
  setCompanyProfile: async () => {
    set({ companyProfileLoading: true })
    try {
      const response = await fetch('/general.json')
      const companyProfile = await response.json()
      set({ companyProfile })
    } catch (error) {
      console.error('Failed to fetch company profile:', error)
    } finally {
      set({ companyProfileLoading: false })
    }
  },
  companyProfileLoading: false,

  graphInfo: null,
  setGraphInfo: async () => {
    set({ graphInfoLoading: true })
    try {
      const response = await fetch('/graph.json')
      const graphInfo = await response.json()
      set({ graphInfo })
    } catch (error) {
      console.error('Failed to fetch graph info:', error)
    } finally {
      set({ graphInfoLoading: false })
    }
  },
  graphInfoLoading: false,

  newsListInfo: null,
  setNewsListInfo: async () => {
    set({ newsListLoading: true })
    try {
      const response = await fetch('/news.json')
      const newsListInfo = await response.json()
      set({ newsListInfo })
    } catch (error) {
      console.error('Failed to fetch news list:', error)
    } finally {
      set({ newsListLoading: false })
    }
  },
  newsListLoading: false,
}))

export default useDetailsStore
