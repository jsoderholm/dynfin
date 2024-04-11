import axios from 'axios'
import { getFormattedDate } from '../utils'

const BASE_URL = 'https://corsproxy.io/?https://api.finage.co.uk'

export type CompanyProfile = {
  symbol: string
  logo: string
  name: string
  url: string
  description: string
  exchange: string
  ceo: string
  industry: string
  state: string
  address: string
  employees: number
  sector: string
  marketcap: number
}

export type GraphInfo = {
  symbol: string
  results: GraphResult[]
}

export type GraphResult = {
  name: string
  o: number
  h: number
  l: number
  c: number
  v: number
  t: number
}

export async function getGraphInfoFromFinage(symbol: string): Promise<GraphInfo> {
  const params = new URLSearchParams({ apikey: import.meta.env.VITE_FINAGE_API_KEY })
  const multiply = 1
  const time = ['day']
  const to = getFormattedDate()
  const from = getFormattedDate(-14)

  const url = `${BASE_URL}/agg/stock/${symbol}/${multiply}/${time}/${from}/${to}?${params}`

  try {
    const response = await axios.get(url)
    const { symbol, results } = response.data
    const data: GraphInfo = {
      symbol,
      results: results.map((result: GraphResult) => {
        const name = new Date(result.t).toLocaleString('en-US', { month: 'short', day: '2-digit' })
        return { ...result, name }
      }),
    }
    return data
  } catch (e) {
    throw new Error(`Failed to fetch graph info from Finage: ${e}`)
  }
}

export async function getCompanyProfileFromFinage(symbol: string): Promise<CompanyProfile> {
  const params = new URLSearchParams({ apikey: import.meta.env.VITE_FINAGE_API_KEY })
  const url = `${BASE_URL}/detail/stock/${symbol}?${params}`

  try {
    const response = await axios.get(url)
    const data: CompanyProfile = {
      ...response.data,
    }
    return data
  } catch (e) {
    throw new Error(`Failed to fetch company profile from Finage: ${e}`)
  }
}
