import { Skeleton } from '@/components/ui/skeleton'
import useDetailsStore from '@/stores/details-store'
import CompanyProfileView from '@/views/company-profile-view'
import GraphView from '@/views/graph-view'
import NewsListView from '@/views/news-list-view'
import { getRouteApi } from '@tanstack/react-router'
import { useEffect } from 'react'

const route = getRouteApi('/_auth/details/$symbol')

function DetailsPresenter() {
  const { symbol } = route.useParams()
  const { newsListLoading, companyProfileLoading, graphInfoLoading } = useDetailsStore((state) => ({
    newsListLoading: state.newsListLoading,
    companyProfileLoading: state.companyProfileLoading,
    graphInfoLoading: state.graphInfoLoading,
  }))
  const companyProfile = useDetailsStore((state) => state.companyProfile)
  const setCompanyProfile = useDetailsStore((state) => state.setCompanyProfile)
  const setGraphInfo = useDetailsStore((state) => state.setGraphInfo)
  const graphInfo = useDetailsStore((state) => state.graphInfo)
  const newsListInfo = useDetailsStore((state) => state.newsListInfo)
  const setNewsListInfo = useDetailsStore((state) => state.setNewsListInfo)

  useEffect(() => {
    setCompanyProfile(symbol)
    setGraphInfo(symbol)
    setNewsListInfo(symbol)
  }, [symbol, setCompanyProfile, setGraphInfo, setNewsListInfo])

  return (
    <div className='container'>
      <div className='space-y-10 py-10 '>
        {companyProfileLoading ? (
          <>
            <h2 className='text-3xl font-semibold pb-6'>Company Profile</h2>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 h-96 mb-10'>
              <Skeleton className='h-full col-span-1' />
              <Skeleton className='h-full col-span-2' />
            </div>
          </>
        ) : companyProfile ? (
          <CompanyProfileView info={companyProfile} />
        ) : (
          <ErrorMessage message='Failed to fetch company profile' />
        )}
        {newsListLoading ? (
          <div>
            <h2 className='text-3xl font-semibold pb-6'>News</h2>
            <div className='grid grid-cols-3 gap-10 mb-10'>
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className='h-72' />
              ))}
            </div>
          </div>
        ) : newsListInfo ? (
          <NewsListView data={newsListInfo} />
        ) : (
          <ErrorMessage message='Failed to fetch news list' />
        )}
        {graphInfoLoading ? (
          <>
            <h2 className='text-3xl font-semibold pb-6'>Graph</h2>
            <div>
              <Skeleton className='h-96' />
            </div>
          </>
        ) : graphInfo ? (
          <GraphView info={graphInfo} onRefresh={() => setGraphInfo(symbol, true)} />
        ) : (
          <ErrorMessage message='Failed to fetch graph info' />
        )}
      </div>
    </div>
  )
}

interface ErrorMessageProps {
  message: string
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className='text-destructive'>
      <h2 className='text-3xl font-semibold'>{message}</h2>
    </div>
  )
}

export default DetailsPresenter
