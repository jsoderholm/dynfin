import axios from 'axios'

const BASE_URL = 'https://stocknewsapi.com/api/v1/'

type Meta = {
  data: NewsInfo[]
}

export type NewsInfo = {
  news_url: string
  image_url: string
  title: string
  text: string
  source_name: string
  date: Date
  topics: string[]
  sentiment: string
  type: string
  tickers: string[]
}

export async function getNewsInfoByCategoryFromStockNews(): Promise<NewsInfo[]> {
  const params = new URLSearchParams({
    token: import.meta.env.VITE_STOCKNEWS_API_KEY,
    section: 'alltickers',
    items: '12',
  })
  const url = `${BASE_URL}category?${params}`

  try {
    const response = await axios.get(url)
    const response_data: Meta = {
      ...response.data,
    }
    return response_data.data
  } catch (e) {
    throw new Error(`Failed to fetch company profile from Stock News API: ${e}`)
  }
}

export async function getNewsInfoBySymbolFromStockNews(symbol: string, items: number = 6): Promise<NewsInfo[]> {
  const params = new URLSearchParams({
    token: import.meta.env.VITE_STOCKNEWS_API_KEY,
    tickers: symbol,
    items: items.toString(),
  })

  const url = `${BASE_URL}?${params}`

  try {
    const response = await axios.get(url)
    const response_data: Meta = {
      ...response.data,
    }
    return response_data.data
  } catch (e) {
    throw new Error(`Failed to fetch company profile from Stock News API: ${e}`)
  }
}
