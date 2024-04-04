import { Skeleton } from '@/components/ui/skeleton'
import useDetailsStore from '@/stores/details-store'
import CompanyProfileView from '@/views/company-profile-view'
import GraphView from '@/views/graph-view'
import NewsListView from '@/views/news-list-view'
import { IconArrowLeft } from '@tabler/icons-react'
import { Link, getRouteApi } from '@tanstack/react-router'
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

  const loading = newsListLoading || companyProfileLoading || graphInfoLoading

  useEffect(() => {
    setCompanyProfile(symbol)
  }, [symbol, setCompanyProfile])

  if (loading) {
    return <Loading />
  }

  return (
    <div className='container'>
      <div className='my-6'>
        <Link to='/'>
          <IconArrowLeft />
        </Link>
      </div>
      <div className='space-y-10 pb-10'>
        {companyProfile ? (
          <CompanyProfileView info={companyProfile} />
        ) : (
          <div className='text-destructive'>
            <h2 className='text-3xl font-semibold pb-6'>Failed to fetch company profile</h2>
          </div>
        )}
        <NewsListView />
        <GraphView />
      </div>
    </div>
  )
}

const Loading = () => {
  return (
    <div className='container'>
      <div className='my-6'>
        <Skeleton className='h-8 w-8' />
      </div>
      <Skeleton className='mb-6 h-10 w-1/4' />
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 h-96 mb-10'>
        <Skeleton className='h-full col-span-1' />
        <Skeleton className='h-full col-span-2' />
      </div>
      <Skeleton className='mb-6 h-10 w-1/4' />
      <div className='grid grid-cols-4 gap-10 mb-10'>
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className='h-48' />
        ))}
      </div>
      <Skeleton className='mb-6 h-10 w-1/4' />
      <div>
        <Skeleton className='h-96' />
      </div>
    </div>
  )
}

export default DetailsPresenter
