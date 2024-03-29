import useDetailsStore from '@/stores/details-store'
import GraphView from '@/views/graph-view'
import InfoView from '@/views/info-view'
import NewsListView from '@/views/news-list-view'
import { getRouteApi } from '@tanstack/react-router'
import { useEffect } from 'react'

const route = getRouteApi('/_auth/details/$symbol')

function DetailsPresenter() {
  const { symbol } = route.useParams()
  const { setSymbol, symbol: stateSymbol } = useDetailsStore()

  useEffect(() => setSymbol(symbol), [symbol, setSymbol])

  return (
    <div>
      <InfoView symbol={stateSymbol} />
      <NewsListView />
      <GraphView />
    </div>
  )
}

export default DetailsPresenter
