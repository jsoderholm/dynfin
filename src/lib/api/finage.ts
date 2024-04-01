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
// {
// 	"symbol":"AAPL",
// 	"totalResults":3,
// 	"results": [
// 		{ "o":80.88,"h":81.19,"l":79.7375,"c":80.3625,"v":118746872,"t":1580878800000 },
// 		{ "o":80.6425,"h":81.305,"l":80.0662,"c":81.3025,"v":105392140,"t":1580965200000 },
// 		{ "o":80.5925,"h":80.85,"l":79.5,"c":80.0075,"v":117684048,"t":1581051600000 }
// 	]
// }
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
  // const BASE_URL = 'https://api.finage.co.uk'
  // const params = new URLSearchParams({ apikey: import.meta.env.VITE_FINAGE_API_KEY })
  // const url = `${BASE_URL}/detail/stock/${symbol}?${params}`

  return {
    symbol,
    logo: 'https://finage.s3.eu-west-2.amazonaws.com/stock/logo/AAPL.png',
    name: 'Apple Inc.',
    url: 'http://www.apple.com',
    description:
      'Apple Inc is designs, manufactures and markets mobile communication and media devices and personal computers, and sells a variety of related software, services, accessories, networking solutions and third-party digital content and applications.',
    exchange: 'US Stock',
    ceo: 'Timothy D. Cook',
    industry: 'Computer Hardware',
    state: 'CA',
    address: '1 Infinite Loop Cupertino CA, 95014',
    employees: 123000,
    sector: 'Technology',
    marketcap: 908316631180,
  }
}
