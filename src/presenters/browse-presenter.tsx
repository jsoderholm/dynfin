import useBrowseStore, { Filter } from '@/stores/browse-store'
import BrowseView from '@/views/browse-view'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MultipleSelector from '@/components/ui/multiple-selector'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SECTORS } from '@/lib/browse-filtering'

function BrowsePresenter() {
  const { browse, setBrowse, browseLoading, currentPage, setPage, currentTab, setTab, currentFilter, setFilter } =
    useBrowseStore()

  useEffect(() => {
    setBrowse(currentPage, currentFilter)
  }, [setBrowse, currentPage, currentFilter])

  useEffect(() => {
    setPage(currentPage)
  }, [currentPage, setPage])

  useEffect(() => {
    setTab(currentTab)
  }, [currentTab, setTab])

  function handleRetry() {
    setBrowse(currentPage, currentFilter)
  }

  function handlePageChange(currentPage: number) {
    setPage(currentPage)
  }

  function handleTabChange(currentTab: string) {
    setTab(currentTab)
  }

  if (browseLoading) {
    return <Loading currentTab={currentTab} currentFilter={currentFilter} />
  }

  return browse ? (
    <div>
      <BrowseView
        data={browse}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        currentTab={currentTab}
        onSetTab={handleTabChange}
        currentFilter={currentFilter}
        onSetFilter={setFilter}
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
  currentFilter: Filter
}

const Loading = ({ currentTab, currentFilter }: LoadingProps) => {
  return (
    <div className='container '>
      <div className='flex justify-between py-6 gap-3'>
        <h2 className='text-3xl font-semibold'>Browse</h2>
        <MultipleSelector
          value={currentFilter.topics}
          hidePlaceholderWhenSelected
          placeholder='Topics...'
          emptyIndicator={
            <p className='text-center text-lg leading-10 text-gray-600 dark:text-gray-400'>no results found.</p>
          }
          groupBy='group'
        />
        <Button disabled={currentFilter.topics?.length === 0}>Clear</Button>
        {currentTab === 'all' ? (
          <Select defaultValue={currentFilter.sector.value}>
            <SelectTrigger className='w-80'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SECTORS.map((sector) => (
                <SelectItem value={sector.value}>{sector.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          ''
        )}
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
