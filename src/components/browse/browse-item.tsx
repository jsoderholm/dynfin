import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import NewsModal from '@/components/news-modal'
import { CombinedInfo } from '@/lib/api/stock-news'

export type BrowseItemProps = {
  info: CombinedInfo
}

export const BrowseItem = ({ info }: BrowseItemProps) => {
  const { text } = info
  const summary = text.slice(0, text.lastIndexOf(' ', 150)) + '...'
  const title = info.dataType === 'news' ? info.title : info.headline
  const shortenedTitle = title.slice(0, title.lastIndexOf(' ', 50)) + '...'

  return (
    <Card className='flex flex-col'>
      <CardHeader>
        <CardTitle>{shortenedTitle}</CardTitle>
      </CardHeader>
      <CardContent className='flex-grow'>
        <p className='text-muted-foreground'>{summary}</p>
      </CardContent>
      <CardFooter>
        <NewsModal news={info} />
      </CardFooter>
    </Card>
  )
}
