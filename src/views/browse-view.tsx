import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { NewsInfo } from '@/lib/api/market-aux'
import { Link } from '@tanstack/react-router'

interface NewsInfoProps {
  data: NewsInfo[]
}

function BrowseView({ data }: NewsInfoProps) {
  console.log(data)
  return (
    <div className='container py-10'>
      <h2 className='text-3xl font-semibold pb-6'>Browse</h2>
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from(data).map((item) => (
          <BrowseItem info={item} />
        ))}
      </div>
    </div>
  )
}

interface BrowseItemProps {
  info: NewsInfo
}

const BrowseItem = ({ info }: BrowseItemProps) => {
  const { title, description } = info
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-muted-foreground'>{description}</p>
      </CardContent>
      <CardFooter className='flex items-center justify-center'>
        <Link to='/details/$symbol' params={{ symbol: 'AAPL' }}>
          <Button variant='ghost'>{`View Company Profile for ${'AAPL'}`}</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default BrowseView
