import useBrowseStore from '@/stores/browse-store'
import BrowseView from '@/views/browse-view'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

function BrowsePresenter() {
  const { browse, setBrowse, browseLoading, currentPage, setPage, currentTab, setTab } = useBrowseStore()

  useEffect(() => {
    setBrowse(currentPage)
  }, [setBrowse, currentPage])

  useEffect(() => {
    setPage(currentPage)
  }, [currentPage, setPage])

  useEffect(() => {
    setTab(currentTab)
  }, [currentTab, setTab])

  function handleRetry() {
    setBrowse(currentPage)
  }

  function handlePageChange(currentPage: number) {
    setPage(currentPage)
  }

  function handleTabChange(currentTab: string) {
    setTab(currentTab)
  }

  if (browseLoading) {
    return <Loading currentTab={currentTab} />
  }

  return browse ? (
    <div>
      <BrowseView
        data={browse}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        currentTab={currentTab}
        onSetTab={handleTabChange}
      />
    </div>
  ) : (
    <div className='text-destructive'>
      <h2 className='text-3xl font-semibold pb-6'>Failed to fetch news items</h2>
      <button onClick={handleRetry}>Retry</button>
    </div>
  )
}

interface LoadingProps {
  currentTab: string
}

const Loading = ({ currentTab }: LoadingProps) => {
  return (
    <div className='container '>
      <div className='flex justify-between py-6'>
        <h2 className='text-3xl font-semibold'>Browse</h2>
        <Tabs defaultValue={currentTab}>
          <TabsList>
            <TabsTrigger value='all'>All News</TabsTrigger>
            <TabsTrigger value='trending'>Trending</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className='h-64' />
        ))}
      </div>
    </div>
  )
}

export default BrowsePresenter
