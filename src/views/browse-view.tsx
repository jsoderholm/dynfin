import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFavorite, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { CombinedInfo } from '@/lib/api/stock-news'
import { Link } from '@tanstack/react-router'

interface FavoriteItemProps {
  isFavorited: (ticker: string) => boolean
  onToggleFavorite: (ticker: string, title: string) => void
  userLoggedIn: boolean
}

interface NewsInfoProps extends FavoriteItemProps {
  data: CombinedInfo[]
}

function BrowseView({ data, isFavorited, onToggleFavorite, userLoggedIn }: NewsInfoProps) {
  return (
    <div className='container py-10'>
      <h2 className='text-3xl font-semibold pb-6'>Browse</h2>
      <Tabs defaultValue='all'>
        <TabsList className='my-6'>
          <TabsTrigger value='all'>All News</TabsTrigger>
          <TabsTrigger value='trending'>Trending</TabsTrigger>
          <TabsTrigger value='saved'>Saved</TabsTrigger>
        </TabsList>
        <TabsContent value='all'>
          <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {Array.from(data)
              .filter((item) => item.dataType === 'news')
              .map((item) => (
                <BrowseItem
                  info={item}
                  isFavorited={isFavorited}
                  onToggleFavorite={onToggleFavorite}
                  userLoggedIn={userLoggedIn}
                />
              ))}
          </div>
        </TabsContent>
        <TabsContent value='trending'>
          <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {Array.from(data)
              .filter((item) => item.dataType === 'trending')
              .map((item) => (
                <BrowseItem
                  info={item}
                  isFavorited={isFavorited}
                  onToggleFavorite={onToggleFavorite}
                  userLoggedIn={userLoggedIn}
                />
              ))}
          </div>
        </TabsContent>
        <TabsContent value='saved'>
          <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {Array.from(data)
              .filter((item) => item.dataType === 'saved')
              .map((item) => (
                <BrowseItem
                  info={item}
                  isFavorited={isFavorited}
                  onToggleFavorite={onToggleFavorite}
                  userLoggedIn={userLoggedIn}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface BrowseItemProps extends FavoriteItemProps {
  info: CombinedInfo
}

const BrowseItem = ({ info, isFavorited, onToggleFavorite, userLoggedIn }: BrowseItemProps) => {
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
    <Card>
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
        <Link to='/details/$symbol' params={{ symbol: tickers[0] }}>
          <Button variant='ghost'>{`Read more`}</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default BrowseView
