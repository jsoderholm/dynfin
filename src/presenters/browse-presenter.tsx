import useBrowseStore from '@/stores/browse-store'
import BrowseView from '@/views/browse-view'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect } from 'react'
import useAuthStore from '@/stores/auth-store'
import useSavedStore from '@/stores/saved-store'

function BrowsePresenter() {
  const { user } = useAuthStore()
  const { toggleFavorite, isFavorited, setSaved, savedLoading } = useSavedStore((state) => ({
    toggleFavorite: state.toggleFavorite,
    isFavorited: state.isFavorited,
    setSaved: state.setSaved,
    savedLoading: state.savedLoading,
  }))

  const browse = useBrowseStore((state) => state.browse)
  const setBrowse = useBrowseStore((state) => state.setBrowse)
  const browseLoading = useBrowseStore((state) => state.browseLoading)
  const loading = browseLoading || savedLoading

  useEffect(() => {
    if (user) {
      setSaved(user.uid)
    }
  }, [user, setSaved])

  useEffect(() => {
    setBrowse()
  }, [setBrowse])

  const handleToggleFavorite = (ticker: string, title: string) => {
    if (!user) {
      return
    }
    toggleFavorite(user.uid, ticker, title)
  }

  const handleRetry = () => {
    setBrowse()
  }

  if (loading) {
    return <Loading />
  }

  return browse ? (
    <BrowseView data={browse} isFavorited={isFavorited} onToggleFavorite={handleToggleFavorite} userLoggedIn={!!user} />
  ) : (
    <div className='text-destructive'>
      <h2 className='text-3xl font-semibold pb-6'>Failed to fetch news items</h2>
      <button onClick={handleRetry}>Retry</button>
    </div>
  )
}

const Loading = () => {
  return (
    <div className='container py-10'>
      <div>
        <div>
          <Skeleton className='h-10 w-28 rounded' />
        </div>
        <br />
        <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className='h-64' />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BrowsePresenter
