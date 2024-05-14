import useBrowseStore, { Filter } from '@/stores/browse-store'
import BrowseView from '@/views/browse-view'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MultipleSelector from '@/components/ui/multiple-selector'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BrowseFilter } from '@/components/browse/browse-filter'

function BrowsePresenter() {
  const {
    browse,
    setBrowse,
    browseLoading,
    currentPage,
    setPage,
    currentTab,
    setTab,
    currentFilter,
    setFilter,
    currentSearch,
    setSearch,
  } = useBrowseStore()

  useEffect(() => {
    setBrowse(currentPage, currentFilter, currentSearch)
  }, [setBrowse, currentPage, currentFilter, currentSearch])

  useEffect(() => {
    setPage(currentPage)
  }, [currentPage, setPage])

  useEffect(() => {
    setTab(currentTab)
  }, [currentTab, setTab])

  function handleRetry() {
    setBrowse(currentPage, currentFilter, currentSearch)
  }

  if (browseLoading) {
    return <Loading currentTab={currentTab} currentFilter={currentFilter} currentSearch={currentSearch} />
  }

  return browse ? (
    <div>
      <BrowseView
        data={browse}
        currentPage={currentPage}
        onPageChange={setPage}
        currentTab={currentTab}
        onSetTab={setTab}
        currentFilter={currentFilter}
        onSetFilter={setFilter}
        currentSearch={currentSearch}
        onSearch={setSearch}
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
  currentSearch: string
}

const Loading = ({ currentTab, currentFilter, currentSearch }: LoadingProps) => {
  return (
    <div className='container '>
      <Tabs defaultValue={currentTab}>
        <div className='flex pt-6 gap-3'>
          <h2 className='text-3xl font-semibold'>Browse</h2>
          <Input placeholder='Search' />
          <Button className='mr-20' type='submit' variant='outline' value={currentSearch}>
            Search
          </Button>
          <BrowseFilter
            filter={currentFilter}
            currentFilter={currentFilter}
            currentTab=''
            setFilter={function (): void {}}
          />
          <TabsList>
            <TabsTrigger value='all'>All News</TabsTrigger>
            <TabsTrigger value='trending'>Trending</TabsTrigger>
          </TabsList>
        </div>
        <div className='flex pt-3 gap-3 '>
          <MultipleSelector
            className='min-h-10 w-1/2'
            value={currentFilter.topics}
            hidePlaceholderWhenSelected
            placeholder='Topics...'
          />
          <Button>Clear filters</Button>
        </div>
        <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className='h-64' />
          ))}
        </div>
      </Tabs>
    </div>
  )
}

export default BrowsePresenter
