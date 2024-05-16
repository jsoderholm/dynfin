import NewsModal from '@/components/news-modal'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { NewsInfo } from '@/lib/api/stock-news'

interface NewsViewProps {
  data: NewsInfo
}

function NewsView({ data }: NewsViewProps) {
  const { title, text } = data
  return (
    <Card className='flex flex-col'>
      <CardHeader>
        <CardTitle>{title} </CardTitle>
      </CardHeader>
      <CardContent className='flex-grow'>
        <p className='text-muted-foreground'>{text}</p>
      </CardContent>
      <CardFooter>
        <NewsModal news={data} />
      </CardFooter>
    </Card>
  )
}

export default NewsView
