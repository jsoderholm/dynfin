import { Pagination } from '@/components/ui/pagination'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { CombinedInfo } from '@/lib/api/stock-news'
import { BrowseItem, BrowseItemProps } from '@/components/browse/browse-item'
import { PaginationNumbers } from '@/components/browse/browse-pagination'
import MultipleSelector, { Option } from '@/components/ui/multiple-selector'
import { TOPICS, SECTORS } from '@/lib/browse-filtering'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export type PaginationProps = {
  onPageChange: (newPage: number) => void
  currentPage: number
  currentTab: string
  onSetTab: (newTab: string) => void
}

export type FilteringProps = {
  currentTopics: Option[] | undefined
  onSetTopics: (topics: Option[]) => void
  currentSector: Option
  onSetSector: (sector: Option) => void
}

type BrowseViewProps = Omit<BrowseItemProps, 'info'> & FilteringProps & PaginationProps & { data: CombinedInfo[] }

function BrowseView(props: BrowseViewProps) {
  const {
    data,
    currentPage,
    onPageChange,
    currentTab,
    onSetTab,
    currentTopics,
    onSetTopics,
    currentSector,
    onSetSector,
  } = props

  function handleTabChange(newTab: string) {
    onSetTab(newTab)
    onPageChange(1)
  }

  const handleSetSector = (value: string) => {
    const sector = SECTORS.find((sector) => sector.value === value)
    if (sector) {
      onSetSector(sector)
    }
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
        <div className='flex justify-between py-6 gap-3'>
          <h2 className='text-3xl font-semibold'>Browse</h2>
          <MultipleSelector
            className=' w-100 min-h-10'
            value={currentTopics}
            onChange={onSetTopics}
            hidePlaceholderWhenSelected
            defaultOptions={TOPICS.sort(sortOption)}
            placeholder='Topics...'
            emptyIndicator={
              <p className='text-center text-lg leading-10 text-gray-600 dark:text-gray-400'>no results found.</p>
            }
          />
          <Button onClick={() => onSetTopics([])} disabled={currentTopics?.length === 0}>
            Clear
          </Button>
          {currentTab === 'all' ? (
            <Select defaultValue={currentSector.value} onValueChange={handleSetSector}>
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
          <TabsList>
            <TabsTrigger value='all'>All News</TabsTrigger>
            <TabsTrigger value='trending'>Trending</TabsTrigger>
          </TabsList>
        </div>

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
