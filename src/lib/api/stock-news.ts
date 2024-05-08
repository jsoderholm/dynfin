import { Option } from '@/components/ui/multiple-selector'
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
  dataType: 'news'
}

export type TrendingInfo = {
  id: number
  headline: string
  text: string
  news_id: number
  sentiment: string
  date: Date
  tickers: string[]
  dataType: 'trending'
}

export type CombinedInfo = NewsInfo | TrendingInfo

const ITEMS = 12

export async function getCombinedInfoFromStockNews(page: number, topics: Option[]): Promise<CombinedInfo[]> {
  const newsPromise = getNewsInfoByCategoryFromStockNews(page, topics)
  const trendingPromise = getTrendingNewsInfoFromStockNews(page, topics)

  try {
    const [newsData, trendingData] = await Promise.all([newsPromise, trendingPromise])
    // Merge the data from both sources into a single array
    const combinedData: CombinedInfo[] = [
      ...newsData.map((newsItem) => ({ ...newsItem, dataType: 'news' as const })),
      ...trendingData.map((trendingItem) => ({ ...trendingItem, dataType: 'trending' as const })),
    ]
    return combinedData
  } catch (e) {
    throw new Error(`Failed to fetch combined data from Stocknewsapi: ${e}`)
  }
}

export async function getNewsInfoByCategoryFromStockNews(page: number = 1, topics: Option[]): Promise<NewsInfo[]> {
  const params = new URLSearchParams({
    token: import.meta.env.VITE_STOCK_NEWS_API_KEY,
    section: 'alltickers',
    page: page.toString(),
    items: ITEMS.toString(),
  })

  if (topics.length > 0) {
    const topicValues = topics.filter((topic) => topic.group === 'Topics').map((topic) => topic.value)
    const sectorValues = topics.filter((topic) => topic.group === 'Sectors').map((topic) => topic.value)
    const collectionValues = topics.filter((topic) => topic.group === 'Collections').map((topic) => topic.value)

    if (topicValues.length > 0) {
      params.append('topic', topicValues.join(','))
    }

    if (sectorValues.length > 0) {
      params.append('sector', sectorValues.join(','))
    }

    if (collectionValues.length > 0) {
      params.append('collection', collectionValues.join(','))
    }
  }

  const url = `${BASE_URL}category?${params}`

  try {
    const response = await axios.get(url)
    const response_data: { data: NewsInfo[] } = response.data
    return response_data.data
  } catch (e) {
    throw new Error(`Failed to fetch company profile from Stocknewsapi: ${e}`)
  }
}

export async function getTrendingNewsInfoFromStockNews(page: number = 1, topics: Option[]): Promise<TrendingInfo[]> {
  const params = new URLSearchParams({
    token: import.meta.env.VITE_STOCK_NEWS_API_KEY,
    items: ITEMS.toString(),
    page: page.toString(),
  })

  if (topics.length > 0) {
    const topicValues = topics.filter((topic) => topic.group === 'Topics').map((topic) => topic.value)
    const sectorValues = topics.filter((topic) => topic.group === 'Sectors').map((topic) => topic.value)
    const collectionValues = topics.filter((topic) => topic.group === 'Collections').map((topic) => topic.value)

    if (topicValues.length > 0) {
      params.append('topic', topicValues.join(','))
    }

    if (sectorValues.length > 0) {
      params.append('sector', sectorValues.join(','))
    }

    if (collectionValues.length > 0) {
      params.append('collection', collectionValues.join(','))
    }
  }

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
    token: import.meta.env.VITE_STOCK_NEWS_API_KEY,
    tickers: tickers.toString(),
    items: ITEMS.toString(),
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
    token: import.meta.env.VITE_STOCK_NEWS_API_KEY,
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
