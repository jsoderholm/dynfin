import { NewsInfo } from '@/lib/api/stock-news'
import NewsView from './news-view'

interface NewsListViewProps {
  data: NewsInfo[]
}

function NewsListView({ data }: NewsListViewProps) {
  return (
    <div>
      <h2 className='text-3xl font-semibold pb-6'>News</h2>
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {data.map((item) => (
          <NewsView data={item} />
        ))}
      </div>
    </div>
  )
}

export default NewsListView
