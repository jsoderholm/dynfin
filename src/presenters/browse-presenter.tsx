import useBrowseStore from '@/stores/browse-store'
import BrowseView from '@/views/browse-view'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect } from 'react'

function BrowsePresenter() {
  const loading = useBrowseStore((state) => state.browseLoading)
  const browse = useBrowseStore((state) => state.browse)
  const setBrowse = useBrowseStore((state) => state.setBrowse)

  useEffect(() => {
    setBrowse()
  }, [setBrowse])

  if (loading) {
    return <Loading />
  }

  return browse ? (
    <BrowseView data={browse} />
  ) : (
    <div className='text-destructive'>
      <h2 className='text-3xl font-semibold pb-6'>Failed to fetch news items</h2>
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

export default BrowsePresenter
