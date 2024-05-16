import useBrowseStore, { Filter } from '@/stores/browse-store'
import BrowseView from '@/views/browse-view'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MultipleSelector, { Option } from '@/components/ui/multiple-selector'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BrowseFilter } from '@/components/browse/browse-filter'
import { COLLECTIONS, COUNTRIES, INDUSTRIES, SECTORS, TOPICS } from '@/lib/browse-filtering'

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
    newsPages,
    trendingPages,
  } = useBrowseStore()

  const maxPages = currentTab === 'all' ? newsPages : trendingPages

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

  function handleTabChange(newTab: string) {
    setTab(newTab)
    setPage(1)
  }

  const filter: Filter = {
    topics: currentFilter.topics,
    sector: currentFilter.sector,
    industry: currentFilter.industry,
    country: currentFilter.country,
    collection: currentFilter.collection,
  }

  const handleSetFilter = () => {
    if (
      currentFilter.collection !== filter.collection ||
      currentFilter.country !== filter.country ||
      currentFilter.industry !== filter.industry ||
      currentFilter.sector !== filter.sector ||
      currentFilter.topics !== filter.topics
    ) {
      setFilter(filter)
    }
  }

  const resetFilter = () => {
    filter.topics = []
    filter.sector = SECTORS[0]
    filter.industry = INDUSTRIES[0]
    filter.country = COUNTRIES[0]
    filter.collection = COLLECTIONS[0]
    handleSetFilter()
  }

  const clearDisabled = (): boolean | undefined => {
    if (currentTab == 'all') {
      return (
        currentFilter.topics?.length === 0 &&
        currentFilter.collection.value === 'all' &&
        currentFilter.country.value === 'all' &&
        currentFilter.sector.value === 'all' &&
        currentFilter.industry.value === 'all'
      )
    }

    return currentFilter.topics?.length === 0 && currentFilter.collection.value === 'all'
  }

  function sortOption(a: Option, b: Option) {
    const labelA = a.label.toUpperCase()
    const labelB = b.label.toUpperCase()

    if (labelA < labelB) {
      return -1
    }
    if (labelA > labelB) {
      return 1
    }

    return 0
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= maxPages) {
      setPage(newPage)
      window.scrollTo(0, 0)
    }
  }

  if (browseLoading) {
    return <Loading currentTab={currentTab} currentFilter={currentFilter} currentSearch={currentSearch} />
  }

  return browse ? (
    <div>
      <BrowseView
        data={browse}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        currentTab={currentTab}
        maxPages={maxPages}
        onSetTab={handleTabChange}
        currentFilter={currentFilter}
        onSetFilter={handleSetFilter}
        currentSearch={currentSearch}
        onSearch={setSearch}
        filter={filter}
        resetFilter={resetFilter}
        clearDisabled={clearDisabled}
        filterTopics={TOPICS.sort(sortOption)}
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
          <Input placeholder='Search' className='w-3/4' value={currentSearch} />
          <Button className='mr-20' type='submit' value={currentSearch}>
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
            className='min-h-10 max-w-96'
            value={currentFilter.topics}
            hidePlaceholderWhenSelected
            placeholder='Select topics...'
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
