import axios from 'axios'

const BASE_URL = 'https://api.finage.co.uk'

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

// https://finage.co.uk/docs/api/us-stocks#stock-market-aggregates-api
export type GraphInfo = {
  symbol: string
  totalResults: number
  results: {
    o: number
    h: number
    l: number
    c: number
    v: number
    t: number
  }[]
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
