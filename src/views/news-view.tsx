import { Button } from '@/components/ui/button'
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
        <Button variant='secondary' className='w-full'>
          Read more
        </Button>
      </CardFooter>
    </Card>
  )
}

export default NewsView
