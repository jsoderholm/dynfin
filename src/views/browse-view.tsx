import { Pagination } from '@/components/ui/pagination'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { CombinedInfo } from '@/lib/api/stock-news'
import { BrowseItem, BrowseItemProps } from '@/components/browse/browse-item'
import { PaginationNumbers } from '@/components/browse/browse-pagination'
import MultipleSelector, { Option } from '@/components/ui/multiple-selector'
import { Button } from '@/components/ui/button'
import { Filter } from '@/stores/browse-store'
import { BrowseFilter } from '@/components/browse/browse-filter'
import { BrowseSearch, SearchProps } from '@/components/browse/browse-search'
import { Icons } from '@/components/icons'

export type PaginationProps = {
  onPageChange: (newPage: number) => void
  currentPage: number
  maxPages: number
}

export type FilteringProps = {
  currentFilter: Filter
  filter: Filter
  onSetFilter: () => void
  resetFilter: () => void
  clearDisabled: () => boolean | undefined
  filterTopics: Option[]
}

type BrowseViewProps = Omit<BrowseItemProps, 'info'> &
  FilteringProps &
  PaginationProps &
  SearchProps & { data: CombinedInfo[] } & { currentTab: string; onSetTab: (newTab: string) => void }

function BrowseView(props: BrowseViewProps) {
  const {
    data,
    currentPage,
    onPageChange,
    currentTab,
    onSetTab,
    currentFilter,
    onSetFilter,
    onSearch,
    currentSearch,
    maxPages,
    filter,
    resetFilter,
    clearDisabled,
    filterTopics,
  } = props

  return (
    <div className='container'>
      <Tabs defaultValue={currentTab} onValueChange={onSetTab}>
        <div className='pt-6 flex gap-3'>
          <h2 className='text-3xl font-semibold'>Browse</h2>
          <BrowseSearch currentSearch={currentSearch} onSearch={onSearch} currentTab={currentTab} />{' '}
          <BrowseFilter filter={filter} currentFilter={currentFilter} setFilter={onSetFilter} currentTab={currentTab} />
          <TabsList className='justify-end'>
            <TabsTrigger value='all'>All News</TabsTrigger>
            <TabsTrigger value='trending'>Trending</TabsTrigger>
          </TabsList>
        </div>
        <div className='flex justify-end min-h-10 pt-3 gap-3 '>
          {currentTab === 'all' ? (
            <MultipleSelector
              className='flex min-h-10 max-w-96'
              value={currentFilter.topics}
              onChange={(values) => (filter.topics = values) && onSetFilter()}
              hidePlaceholderWhenSelected
              defaultOptions={filterTopics}
              placeholder='Select topics...'
              emptyIndicator={
                <p className='text-center text-lg leading-10 text-gray-600 dark:text-gray-400'>no results found.</p>
              }
            />
          ) : (
            ''
          )}

          <Button onClick={() => resetFilter()} disabled={clearDisabled()}>
            Clear filters
          </Button>
        </div>
        <div className='flex pt-3 justify-between gap-3 '></div>
        <TabsContent value='all'>
          {maxPages === undefined ? (
            <div className='flex justify-center text-lg'>
              <p className='pr-2'>No items found</p>
              <Icons.not_found />
            </div>
          ) : (
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {Array.from(data)
                .filter((item) => item.dataType === 'news')
                .map((item) => (
                  <BrowseItem info={item} />
                ))}
            </div>
          )}
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
        <PaginationNumbers currentPage={currentPage} onPageChange={onPageChange} maxPages={maxPages} />
      </Pagination>
    </div>
  )
}

export default BrowseView
