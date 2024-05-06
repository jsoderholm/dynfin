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

export async function getNewsInfoFromStockNews(): Promise<NewsInfo[]> {
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
    throw new Error(`Failed to fetch company profile from Stocknewsapi: ${e}`)
  }
}

//     "uuid": "090839fb-5cd9-49d8-a8bd-c8e178bf2909",
//     "title": "UN adopts first global artificial intelligence resolution By Reuters",
//     "description": "UN adopts first global artificial intelligence resolution",
//     "keywords": "",
//     "snippet": "Published Mar 21, 2024 12:38PM ET\n\n2/2 © Reuters. FILE PHOTO: The United Nations building is pictured in New York City, U.S., February 23, 2023. REUTERS/Mike S...",
//     "url": "https://www.investing.com/news/economy/un-adopts-first-global-artificial-intelligence-resolution-3348452",
//     "image_url": "https://i-invdn-com.investing.com/news/LYNXMPEE0L0XJ_L.jpg",
//     "language": "en",
//     "published_at": "2024-03-21T16:42:04.000000Z",
//     "source": "investing.com",
//     "relevance_score": null,
//     "entities": [
//         {
//             "symbol": "MSFT",
//             "name": "Microsoft Corporation",
//             "exchange": null,
//             "exchange_long": null,
//             "country": "us",
//             "type": "equity",
//             "industry": "Technology",
//             "match_score": 11.285149,
//             "sentiment_score": 0,
//             "highlights": [
//                 {
//                     "highlight": "Last month, Microsoft (NASDAQ: ) said it had caught hackers from both countries using Microsoft-backed OpenAI software to hone their espionage skills.",
//                     "sentiment": 0,
//                     "highlighted_in": "main_text"
//                 }
//             ]
//         }
//     ],
//     "similar": []
// },
