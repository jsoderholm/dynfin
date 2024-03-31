import CompanyProfileView from '@/views/company-profile-view'
import GraphView from '@/views/graph-view'
import NewsListView from '@/views/news-list-view'
import { getRouteApi } from '@tanstack/react-router'

const route = getRouteApi('/_auth/details/$symbol')

function DetailsPresenter() {
  const { symbol } = route.useParams()

  const info = {
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

  return (
    <div>
      <CompanyProfileView info={info} />
      <NewsListView />
      <GraphView />
    </div>
  )
}

export default DetailsPresenter
