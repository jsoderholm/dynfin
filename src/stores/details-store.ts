import { CompanyProfile, GraphInfo, getCompanyProfileFromFinage } from '@/lib/api/finage'
import { NewsInfo } from '@/lib/api/market-aux'
import { getCompanyProfileFromFirestore, saveCompanyProfileToFirestore } from '@/lib/db'
import { create } from 'zustand'

interface DetailsState {
  companyProfile: CompanyProfile | null
  setCompanyProfile: (symbol: string) => Promise<void>
  companyProfileLoading: boolean

  graphInfo: GraphInfo | null
  setGraphInfo: (symbol: string) => Promise<void>
  graphInfoLoading: boolean

  newsListInfo: NewsInfo[] | null
  setNewsListInfo: (string: string) => Promise<void>
  newsListLoading: boolean
}

const useDetailsStore = create<DetailsState>((set) => ({
  companyProfile: null,
  setCompanyProfile: async (symbol: string) => {
    set({ companyProfileLoading: true })
    try {
      const snapshot = await getCompanyProfileFromFirestore(symbol.toUpperCase())

      if (snapshot.exists()) {
        useDetailsStore.setState({ companyProfile: snapshot.data(), companyProfileLoading: false })
        return
      }
      // Fetch the data from the Finage API
      const data = await getCompanyProfileFromFinage(symbol)
      // Save the data to Firestore
      await saveCompanyProfileToFirestore(symbol, data)
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
