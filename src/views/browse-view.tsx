import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFavorite, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { NewsInfo } from '@/lib/api/stock-news'
import { Link } from '@tanstack/react-router'

interface FavoriteItemProps {
  isFavorited: (ticker: string) => boolean
  onToggleFavorite: (ticker: string, title: string) => void
}

interface NewsInfoProps extends FavoriteItemProps {
  data: NewsInfo[]
}

function BrowseView({ data, isFavorited, onToggleFavorite }: NewsInfoProps) {
  return (
    <div className='container py-10'>
      <h2 className='text-3xl font-semibold pb-6'>Browse</h2>
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from(data).map((item) => (
          <BrowseItem info={item} isFavorited={isFavorited} onToggleFavorite={onToggleFavorite} />
        ))}
      </div>
    </div>
  )
}

interface BrowseItemProps extends FavoriteItemProps {
  info: NewsInfo
}

const BrowseItem = ({ info, isFavorited, onToggleFavorite }: BrowseItemProps) => {
  const { title, text, tickers } = info

  const favorited = isFavorited(tickers[0])

  const handleToggleFavorite = () => {
    onToggleFavorite(tickers[0], title)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardFavorite favorited={favorited} onClick={handleToggleFavorite} aria-label='Favorite Toggler' />
      </CardHeader>
      <CardContent>
        <p className='text-muted-foreground'>{text}</p>
      </CardContent>
      <CardFooter className='flex items-center justify-center'>
        <Link to='/details/$symbol' params={{ symbol: tickers[0] }}>
          <Button variant='ghost'>{`View Company Profile for ${tickers[0]}`}</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default BrowseView
