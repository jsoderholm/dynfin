import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFavorite, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { NewsInfo } from '@/lib/api/stock-news'
import { Link } from '@tanstack/react-router'
import NewsModal from '@/components/news-modal'

interface FavoriteItemProps {
  isFavorited: (ticker: string) => boolean
  onToggleFavorite: (ticker: string, title: string) => void
  userLoggedIn: boolean
}

interface NewsInfoProps extends FavoriteItemProps {
  data: NewsInfo[]
}

function BrowseView({ data, isFavorited, onToggleFavorite, userLoggedIn }: NewsInfoProps) {
  return (
    <div className='container py-10'>
      <h2 className='text-3xl font-semibold pb-6'>Browse</h2>
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from(data).map((item) => (
          <BrowseItem
            info={item}
            isFavorited={isFavorited}
            onToggleFavorite={onToggleFavorite}
            userLoggedIn={userLoggedIn}
          />
        ))}
      </div>
    </div>
  )
}

interface BrowseItemProps extends FavoriteItemProps {
  info: NewsInfo
}

const BrowseItem = ({ info, isFavorited, onToggleFavorite, userLoggedIn }: BrowseItemProps) => {
  const { title, text, tickers } = info

  // Ensure user is logged in before allowing toggle
  if (!userLoggedIn) {
    return <p>Please log in to manage favorites.</p>
  }

  return (
    <Card className='flex flex-col'>
      <CardHeader>
        <CardTitle>{title.slice(0, title.lastIndexOf(' ', 50)) + '...'}</CardTitle>
      </CardHeader>
      <CardContent className='flex-grow'>
        <p className='text-muted-foreground'>{text.slice(0, text.lastIndexOf(' ', 100)) + '...'}</p>
      </CardContent>
      <CardFooter className='grid sm:grid-cols-2 gap-6'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='secondary'>Tickers</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-10'>
            {tickers.map((ticker, index) => (
              <DropdownMenuItem key={index} className='justify-between'>
                <Link to='/details/$symbol' params={{ symbol: ticker }} className='badge'>
                  {ticker}
                </Link>
                <CardFavorite
                  favorited={isFavorited(ticker)}
                  onClick={onToggleFavorite(ticker, title)}
                  aria-label='Favorite Toggler'
                />
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <NewsModal news={info} />
      </CardFooter>
    </Card>
  )
}

export default BrowseView
