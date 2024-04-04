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
  const companyProfile = useDetailsStore((state) => state.companyProfile)
  const setCompanyProfile = useDetailsStore((state) => state.setCompanyProfile)

  useEffect(() => {
    setCompanyProfile(symbol)
  }, [symbol, setCompanyProfile])

  if (!companyProfile) {
    return <Loading />
  }

  return (
    <>
      <div className='container space-y-10 py-10'>
        <CompanyProfileView info={companyProfile} />
        <NewsListView />
        <GraphView />
      </div>
    </>
  )
}

const Loading = () => {
  return (
    <div className='container py-10'>
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
