import NewsView from './news-view'

function NewsListView() {
  return (
    <div>
      {Array.from({ length: 10 }).map((_, i) => (
        <NewsView key={i} />
      ))}
    </div>
  )
}

export default NewsListView
