import { CompanyProfile, GraphInfo, getCompanyProfileFromFinage, getGraphInfoFromFinage } from '@/lib/api/finage'
import { NewsInfo } from '@/lib/api/market-aux'
import {
  getCompanyProfileFromFirestore,
  getGraphInfoFromFirestore,
  saveCompanyProfileToFirestore,
  saveGraphInfoToFirestore,
} from '@/lib/db'
import { create } from 'zustand'

interface DetailsState {
  companyProfile: CompanyProfile | null
  setCompanyProfile: (symbol: string) => Promise<void>
  companyProfileLoading: boolean

  graphInfo: GraphInfo | null
  setGraphInfo: (symbol: string, refresh?: boolean) => Promise<void>
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
      const snapshot = await getCompanyProfileFromFirestore(symbol)

      if (snapshot.exists()) {
        set({ companyProfile: snapshot.data() })
        return
      }
      // Fetch the data from the Finage API
      const data = await getCompanyProfileFromFinage(symbol)
      // Save the data to Firestore
      await saveCompanyProfileToFirestore(symbol, data)
      set({ companyProfile: data })
    } catch (e) {
      console.error('Failed to fetch company profile:', e)
    } finally {
      set({ companyProfileLoading: false })
    }
  },
  companyProfileLoading: false,

  graphInfo: null,
  setGraphInfo: async (symbol: string, refresh: boolean = false) => {
    set({ graphInfoLoading: true })
    try {
      if (!refresh) {
        const snapshot = await getGraphInfoFromFirestore(symbol)
        console.log('from firestore: ', snapshot.data())

        if (snapshot.exists()) {
          set({ graphInfo: snapshot.data() })
          return
        }
      }
      // Fetch the data from the Finage API
      const data = await getGraphInfoFromFinage(symbol)
      // Save the data to Firestore
      await saveGraphInfoToFirestore(data)
      set({ graphInfo: data })
    } catch (e) {
      console.error('Failed to fetch graph info:', e)
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
