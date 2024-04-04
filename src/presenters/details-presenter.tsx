import { Skeleton } from '@/components/ui/skeleton'
import { getCompanyProfileFromFinage } from '@/lib/api/finage'
import { getCompanyProfileFromFirestore, saveCompanyProfileToFirestore } from '@/lib/db'
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

  const loading = newsListLoading || companyProfileLoading || graphInfoLoading

  useEffect(() => {
    /**
     * 1. Fetch company profile data from Firestore using the symbol.
     * 1.1. If the data is not found, fetch the data from the Finage API and save it to Firestore.
     */
    async function getCompanyProfile() {
      useDetailsStore.setState({ companyProfileLoading: true })
      const snapshot = await getCompanyProfileFromFirestore(symbol.toUpperCase())

      if (snapshot.exists()) {
        useDetailsStore.setState({ companyProfile: snapshot.data(), companyProfileLoading: false })
        return
      }

      try {
        // Fetch the data from the Finage API
        const data = await getCompanyProfileFromFinage(symbol)
        // Save the data to Firestore
        await saveCompanyProfileToFirestore(symbol, data)
        // Set the data to the store
        useDetailsStore.setState({ companyProfile: data, companyProfileLoading: false })
      } catch (e) {
        useDetailsStore.setState({ companyProfile: null, companyProfileLoading: false })
        console.error(e)
      }
    }

    getCompanyProfile()
  }, [symbol])

  if (loading) {
    return <Loading />
  }

  return (
    <div className='container space-y-10 py-10'>
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
