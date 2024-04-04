import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'

const symbols = ['AAPL', 'GOOGL', 'TSLA', 'AMZN', 'MSFT', 'FB']

function BrowseView() {
  return (
    <div className='container py-10'>
      <h2 className='text-3xl font-semibold pb-6'>Browse</h2>
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <BrowseItem key={i} i={i} />
        ))}
      </div>
    </div>
  )
}

interface BrowseItemProps {
  i: number
}

const BrowseItem = ({ i }: BrowseItemProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{`News Item ${i + 1}: ${symbols[i]}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-muted-foreground'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
      </CardContent>
      <CardFooter className='flex items-center justify-center'>
        <Link to='/details/$symbol' params={{ symbol: symbols[i] }}>
          <Button variant='ghost'>{`View Company Profile for ${symbols[i]}`}</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default BrowseView
