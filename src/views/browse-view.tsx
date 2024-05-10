import { Pagination } from '@/components/ui/pagination'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { CombinedInfo } from '@/lib/api/stock-news'
import { BrowseItem, BrowseItemProps } from '@/components/browse/browse-item'
import { PaginationNumbers } from '@/components/browse/browse-pagination'
import MultipleSelector, { Option } from '@/components/ui/multiple-selector'
import { TOPICS, SECTORS, INDUSTRIES, COUNTRIES, COLLECTIONS } from '@/lib/browse-filtering'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Filter } from '@/stores/browse-store'
import { BrowseFilter } from '@/components/browse/browse-filter'

export type PaginationProps = {
  onPageChange: (newPage: number) => void
  currentPage: number
  currentTab: string
  onSetTab: (newTab: string) => void
}

export type FilteringProps = {
  currentFilter: Filter
  onSetFilter: (filter: Filter) => void
}

type BrowseViewProps = Omit<BrowseItemProps, 'info'> & FilteringProps & PaginationProps & { data: CombinedInfo[] }

function BrowseView(props: BrowseViewProps) {
  const { data, currentPage, onPageChange, currentTab, onSetTab, currentFilter, onSetFilter } = props

  const filter: Filter = {
    topics: currentFilter.topics,
    sector: currentFilter.sector,
    industry: currentFilter.industry,
    country: currentFilter.country,
    collection: currentFilter.collection,
  }

  function handleTabChange(newTab: string) {
    onSetTab(newTab)
    onPageChange(1)
  }

  const resetFilter = () => {
    filter.topics = []
    filter.sector = SECTORS[0]
    filter.industry = INDUSTRIES[0]
    filter.country = COUNTRIES[0]
    filter.collection = COLLECTIONS[0]
    handleSetFilter()
  }

  const handleSetFilter = () => {
    if (
      currentFilter.collection !== filter.collection ||
      currentFilter.country !== filter.country ||
      currentFilter.industry !== filter.industry ||
      currentFilter.sector !== filter.sector ||
      currentFilter.topics !== filter.topics
    ) {
      onSetFilter(filter)
    }
  }

  const clearDisabled = () => {
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

  return (
    <div className='container'>
      <Tabs defaultValue={currentTab} onValueChange={handleTabChange}>
        <div className='pt-6 flex gap-3'>
          <h2 className='text-3xl font-semibold'>Browse</h2>
          <Input type='search' placeholder='Search' />
          <Button className='mr-20' type='submit' variant='outline'>
            Search
          </Button>
          <BrowseFilter
            filter={filter}
            currentFilter={currentFilter}
            setFilter={handleSetFilter}
            currentTab={currentTab}
          />
          <TabsList>
            <TabsTrigger value='all'>All News</TabsTrigger>
            <TabsTrigger value='trending'>Trending</TabsTrigger>
          </TabsList>
        </div>
        <div className='flex pt-3 gap-3'>
          <MultipleSelector
            className='min-h-10 max-w-80'
            value={currentFilter.topics}
            onChange={(values) => (filter.topics = values) && handleSetFilter()}
            hidePlaceholderWhenSelected
            defaultOptions={TOPICS.sort(sortOption)}
            placeholder='Topics...'
            emptyIndicator={
              <p className='text-center text-lg leading-10 text-gray-600 dark:text-gray-400'>no results found.</p>
            }
          />
          <Button onClick={() => resetFilter()} disabled={clearDisabled()}>
            Clear filters
          </Button>
        </div>
        <div className='flex pt-3 justify-between gap-3 '></div>
        <TabsContent value='all'>
          <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {Array.from(data)
              .filter((item) => item.dataType === 'news')
              .map((item) => (
                <BrowseItem info={item} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value='trending'>
          <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {Array.from(data)
              .filter((item) => item.dataType === 'trending')
              .map((item) => (
                <BrowseItem info={item} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
      <Pagination className='my-5'>
        <PaginationNumbers currentPage={currentPage} onPageChange={onPageChange} />
      </Pagination>
    </div>
  )
}

export default BrowseView
