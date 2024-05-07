import useBrowseStore from '@/stores/browse-store'
import BrowseView from '@/views/browse-view'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect } from 'react'
import useAuthStore from '@/stores/auth-store'
import useSavedStore from '@/stores/saved-store'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

function BrowsePresenter() {
  const { user } = useAuthStore()
  const { saved, toggleFavorite, isFavorited, setSaved, savedLoading } = useSavedStore((state) => ({
    saved: state.saved,
    toggleFavorite: state.toggleFavorite,
    isFavorited: state.isFavorited,
    setSaved: state.setSaved,
    savedLoading: state.savedLoading,
  }))

  const browse = useBrowseStore((state) => state.browse)
  const setBrowse = useBrowseStore((state) => state.setBrowse)
  const browseLoading = useBrowseStore((state) => state.browseLoading)
  const loading = browseLoading || savedLoading
  const currentPage = useBrowseStore((state) => state.currentPage)
  const setPage = useBrowseStore((state) => state.setPage)
  const currentTab = useBrowseStore((state) => state.currentTab)
  const setTab = useBrowseStore((state) => state.setTab)

  useEffect(() => {
    if (user) {
      setSaved(user.uid)
    }
  }, [user, setSaved])

  useEffect(() => {
    setBrowse(currentPage)
  }, [setBrowse, currentPage, saved])

  useEffect(() => {
    setPage(currentPage)
  }, [currentPage, setPage])

  useEffect(() => {
    setTab(currentTab)
  }, [currentTab, setTab])

  const handleToggleFavorite = (ticker: string, title: string) => {
    if (!user) {
      return
    }
    toggleFavorite(user.uid, ticker, title)
  }

  function handleRetry() {
    setBrowse(currentPage)
  }

  function handlePageChange(currentPage: number) {
    setPage(currentPage)
  }

  function handleTabChange(currentTab: string) {
    setTab(currentTab)
  }

  if (loading) {
    return <Loading currentTab={currentTab} />
  }

  return browse ? (
    <div>
      <BrowseView
        data={browse}
        isFavorited={isFavorited}
        onToggleFavorite={handleToggleFavorite}
        userLoggedIn={!!user}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        currentTab={currentTab}
        onSetTab={handleTabChange}
      />
    </div>
  ) : (
    <div className='text-destructive'>
      <h2 className='text-3xl font-semibold pb-6'>Failed to fetch news items</h2>
      <button onClick={handleRetry}>Retry</button>
    </div>
  )
}

interface LoadingProps {
  currentTab: string
}

const Loading = ({ currentTab }: LoadingProps) => {
  return (
    <div className='container py-10'>
      <div>
        <Tabs defaultValue={currentTab}>
          <TabsList className='my-6'>
            <TabsTrigger value='all'>All News</TabsTrigger>
            <TabsTrigger value='trending'>Trending</TabsTrigger>
            <TabsTrigger value='saved'>Saved</TabsTrigger>
          </TabsList>
        </Tabs>
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
