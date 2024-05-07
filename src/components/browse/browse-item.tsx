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

  const handleToggleFavorite = (ticker: string) => {
    onToggleFavorite(ticker, title)
  }

  return (
    <Card className='flex flex-col'>
      <CardHeader>
        <CardTitle>{<p className='line-clamp-2'>{title}</p>}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='line-clamp-3 text-muted-foreground'>{text}</p>
      </CardContent>
      <CardFooter className='flex items-center justify-center'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='outline-none' variant='ghost'>
              Tickers
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {tickers.map((ticker, index) => (
              <DropdownMenuItem key={index} className='justify-between'>
                <Link to='/details/$symbol' params={{ symbol: ticker }}>
                  {ticker}
                </Link>
                <CardFavorite
                  favorited={isFavorited(ticker)}
                  onClick={() => handleToggleFavorite(ticker)}
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
