import { Pagination } from '@/components/ui/pagination'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { CombinedInfo } from '@/lib/api/stock-news'
import { BrowseItem, BrowseItemProps } from '@/components/browse/browse-item'
import { PaginationNumbers } from '@/components/browse/browse-pagination'

export type PaginationProps = {
  onPageChange: (newPage: number) => void
  currentPage: number
  currentTab: string
  onSetTab: (newTab: string) => void
}
type BrowseViewProps = Omit<BrowseItemProps, 'info'> & PaginationProps & { data: CombinedInfo[] }

function BrowseView(props: BrowseViewProps) {
  const { data, currentPage, onPageChange, currentTab, onSetTab } = props

  function handleTabChange(newTab: string) {
    onSetTab(newTab)
    onPageChange(1)
  }

  return (
    <div className='container'>
      <Tabs defaultValue={currentTab} onValueChange={handleTabChange}>
        <div className='flex justify-between py-6'>
          <h2 className='text-3xl font-semibold'>Browse</h2>
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
