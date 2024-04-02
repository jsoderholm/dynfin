import NewsView from './news-view'

function NewsListView() {
  return (
    <div>
      <h2 className='text-3xl font-semibold pb-6'>News</h2>
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <NewsView key={i} />
        ))}
      </div>
    </div>
  )
}

export default NewsListView
