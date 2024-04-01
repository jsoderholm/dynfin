import NewsView from './news-view'

function NewsListView() {
  return (
    <div>
      <h2 className='text-3xl font-semibold pb-6'>News</h2>
      <div className='grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        {Array.from({ length: 10 }).map((_, i) => (
          <NewsView key={i} />
        ))}
      </div>
    </div>
  )
}

export default NewsListView
