import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import useAuthStore from '@/stores/auth-store'
import useDetailsStore from '@/stores/details-store'
import useSavedStore from '@/stores/saved-store'
import CompanyProfileView from '@/views/company-profile-view'
import GraphView from '@/views/graph-view'
import NewsListView from '@/views/news-list-view'
import { IconHeart, IconHeartFilled } from '@tabler/icons-react'
import { getRouteApi } from '@tanstack/react-router'
import { useEffect } from 'react'
import { create } from 'zustand'

const route = getRouteApi('/_auth/details/$symbol')

interface GraphFilterStateProps {
  interval: string
  setInterval: (value: string) => void
  checked: string[]
  setChecked: (value: string) => void
}

const useGraphFilter = create<GraphFilterStateProps>((set, get) => ({
  interval: '14',
  setInterval: (value) => set({ interval: value }),
  checked: ['h', 'l', 'c'],
  setChecked: (value) =>
    get().checked.includes(value)
      ? set({ checked: get().checked.filter((item) => item !== value) })
      : set({ checked: [...get().checked, value] }),
}))

function DetailsPresenter() {
  const { symbol } = route.useParams()
  const { newsListLoading, companyProfileLoading, graphInfoLoading } = useDetailsStore((state) => ({
    newsListLoading: state.newsListLoading,
    companyProfileLoading: state.companyProfileLoading,
    graphInfoLoading: state.graphInfoLoading,
  }))
  const companyProfile = useDetailsStore((state) => state.companyProfile)
  const setCompanyProfile = useDetailsStore((state) => state.setCompanyProfile)
  const setGraphInfo = useDetailsStore((state) => state.setGraphInfo)
  const graphInfo = useDetailsStore((state) => state.graphInfo)
  const newsListInfo = useDetailsStore((state) => state.newsListInfo)
  const setNewsListInfo = useDetailsStore((state) => state.setNewsListInfo)

  const { user } = useAuthStore()
  const { toggleFavorite, saved, setSaved } = useSavedStore()
  const { interval, setInterval, checked, setChecked } = useGraphFilter()

  useEffect(() => {
    if (!user) {
      return
    }
    setCompanyProfile(symbol)
    setGraphInfo(symbol)
    setNewsListInfo(symbol)
    setSaved(user.uid)
  }, [symbol, setCompanyProfile, setGraphInfo, setNewsListInfo, user, setSaved])

  const isFavorited = Array.from(saved).some((obj) => obj.symbol === symbol)

  return (
    <div className='container relative'>
      <Button
        size='icon'
        variant={isFavorited ? 'favorite' : 'secondary'}
        className='absolute top-10 right-8 dark:bg-transparent'
        onClick={() => toggleFavorite(user?.uid ?? '', symbol, companyProfile?.name)}
      >
        {isFavorited ? <IconHeartFilled color='#EA63D9' /> : <IconHeart />}
      </Button>
      <div className='space-y-10 py-10'>
        {companyProfileLoading ? (
          <>
            <div className='flex justify-between'>
              <Skeleton className='h-8 w-64' />
              <Skeleton className='h-8 w-8' />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 h-80 mb-10'>
              <Skeleton className='h-full col-span-1' />
              <Skeleton className='h-full col-span-2' />
            </div>
          </>
        ) : companyProfile ? (
          <CompanyProfileView info={companyProfile} />
        ) : (
          <ErrorMessage message='Failed to fetch company profile' />
        )}
        {graphInfoLoading ? (
          <>
            <h2 className='text-3xl font-semibold pb-6'>Performance</h2>
            <div>
              <Skeleton className='h-96' />
            </div>
          </>
        ) : graphInfo ? (
          <GraphView
            info={graphInfo}
            onRefresh={() => setGraphInfo(symbol, true)}
            interval={interval}
            setInterval={setInterval}
            checked={checked}
            setChecked={setChecked}
          />
        ) : (
          <ErrorMessage message='Failed to fetch graph info' />
        )}
        {newsListLoading ? (
          <div>
            <h2 className='text-3xl font-semibold pb-6'>News</h2>
            <div className='grid grid-cols-3 gap-10 mb-10'>
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className='h-72' />
              ))}
            </div>
          </div>
        ) : newsListInfo ? (
          <NewsListView data={newsListInfo} />
        ) : (
          <ErrorMessage message='Failed to fetch news list' />
        )}
      </div>
    </div>
  )
}

interface ErrorMessageProps {
  message: string
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className='text-destructive'>
      <h2 className='text-3xl font-semibold'>{message}</h2>
    </div>
  )
}

export default DetailsPresenter
