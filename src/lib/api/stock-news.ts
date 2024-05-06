import axios from 'axios'

const BASE_URL = 'https://stocknewsapi.com/api/v1/'

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
  dataType: string
}

export type TrendingInfo = {
  id: number
  headline: string
  text: string
  news_id: number
  sentiment: string
  date: Date
  tickers: string[]
  dataType: string
}

export type CombinedInfo = NewsInfo | TrendingInfo

export async function getCombinedInfoFromStockNews(page: number, saved: string[]): Promise<CombinedInfo[]> {
  const newsPromise = getNewsInfoByCategoryFromStockNews(page)
  const trendingPromise = getTrendingNewsInfoFromStockNews(page)
  const savedPromise = getSavedNewsInfoFromStockNews(page, saved)

  try {
    const [newsData, trendingData, savedData] = await Promise.all([newsPromise, trendingPromise, savedPromise])
    // Merge the data from both sources into a single array
    const combinedData: CombinedInfo[] = [
      ...newsData.map((newsItem) => ({ ...newsItem, dataType: 'news' })),
      ...trendingData.map((trendingItem) => ({ ...trendingItem, dataType: 'trending' })),
      ...savedData.map((trendingItem) => ({ ...trendingItem, dataType: 'saved' })),
    ]
    return combinedData
  } catch (e) {
    throw new Error(`Failed to fetch combined data from Stocknewsapi: ${e}`)
  }
}

export async function getNewsInfoByCategoryFromStockNews(page: number = 1): Promise<NewsInfo[]> {
  const params = new URLSearchParams({
    token: import.meta.env.VITE_STOCKNEWS_API_KEY,
    section: 'alltickers',
    items: '48',
    page: page.toString(),
  })
  const url = `${BASE_URL}category?${params}`

  try {
    const response = await axios.get(url)
    const response_data: { data: NewsInfo[] } = response.data
    return response_data.data
  } catch (e) {
    throw new Error(`Failed to fetch company profile from Stocknewsapi: ${e}`)
  }
}

export async function getTrendingNewsInfoFromStockNews(page: number = 1): Promise<TrendingInfo[]> {
  const params = new URLSearchParams({
    token: import.meta.env.VITE_STOCKNEWS_API_KEY,
    items: '48',
    page: page.toString(),
  })
  const url = `${BASE_URL}trending-headlines?${params}`

  try {
    const response = await axios.get(url)
    const response_data: { data: TrendingInfo[] } = response.data
    return response_data.data
  } catch (e) {
    throw new Error(`Failed to fetch company profile from Stock News API: ${e}`)
  }
}

export async function getSavedNewsInfoFromStockNews(page: number = 1, tickers: string[] = []): Promise<NewsInfo[]> {
  const params = new URLSearchParams({
    token: import.meta.env.VITE_STOCKNEWS_API_KEY,
    tickers: tickers.toString(),
    items: '48',
    page: page.toString(),
  })

  const url = `${BASE_URL}?${params}`

  try {
    const response = await axios.get(url)
    const response_data: { data: NewsInfo[] } = response.data
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
    const response_data: { data: NewsInfo[] } = response.data
    return response_data.data
  } catch (e) {
    throw new Error(`Failed to fetch company profile from Stock News API: ${e}`)
  }
}
