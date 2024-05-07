import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFavorite, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Link } from '@tanstack/react-router'
import NewsModal from '@/components/news-modal'
import { CombinedInfo } from '@/lib/api/stock-news'

export type BrowseItemProps = {
  info: CombinedInfo
  isFavorited: (ticker: string) => boolean
  onToggleFavorite: (ticker: string, title: string) => void
  userLoggedIn: boolean
}

export const BrowseItem = ({ info, isFavorited, onToggleFavorite, userLoggedIn }: BrowseItemProps) => {
  let title: string
  let text: string
  let tickers: string[]

  if ('title' in info) {
    // `info` is of type `NewsInfo`
    const { title: newsTitle, text: newsText, tickers: newsTickers } = info
    title = newsTitle
    text = newsText
    tickers = newsTickers
  } else {
    // `info` is of type `TrendingInfo`
    const { headline, text: trendingText, tickers: trendingTickers } = info
    title = headline
    text = trendingText
    tickers = trendingTickers
  }

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
                  onClick={() => onToggleFavorite(ticker, title)}
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
