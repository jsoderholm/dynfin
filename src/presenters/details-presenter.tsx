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
  const companyProfile = useDetailsStore((state) => state.companyProfile)

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
      // Fetch the data from the Finage API
      const data = await getCompanyProfileFromFinage(symbol)
      // Save the data to Firestore
      await saveCompanyProfileToFirestore(symbol, data)
      // Set the data to the store
      useDetailsStore.setState({ companyProfile: data, companyProfileLoading: false })
    }

    getCompanyProfile()
  }, [symbol])

  if (!companyProfile) {
    return <Loading />
  }

  return (
    <>
      <div className='container'>
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
      <div className='grid grid-cols-2 gap-10 h-64 mb-10'>
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className='h-64' />
        ))}
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
