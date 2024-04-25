import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFavorite, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { NewsInfo } from '@/lib/api/stock-news'
import { Link } from '@tanstack/react-router'
import useSavedStore from '@/stores/saved-store'
import useAuthStore from '@/stores/auth-store.ts'
import { useEffect } from 'react'

interface NewsInfoProps {
  data: NewsInfo[]
}

function BrowseView({ data }: NewsInfoProps) {
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
  const { title, text, tickers } = info
  const { user } = useAuthStore() // Extract user from auth store
  const { toggleFavorite, isFavorited, setSaved } = useSavedStore((state) => ({
    toggleFavorite: state.toggleFavorite,
    isFavorited: state.isFavorited(tickers[0]),
    setSaved: state.setSaved,
  }))

  useEffect(() => {
    if (user) {
      setSaved(user.uid)
    }
  }, [user, setSaved])

  // Ensure user is logged in before allowing toggle
  if (!user) {
    return <p>Please log in to manage favorites.</p>
  }

  const favorited = isFavorited(tickers[0])

  const handleToggleFavorite = () => {
    toggleFavorite(user.uid, tickers[0], title)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardFavorite favorited={isFavorited} onClick={handleToggleFavorite} aria-label='Favorite Toggler' />
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
