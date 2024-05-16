import { Skeleton } from '@/components/ui/skeleton'
import useAuthStore from '@/stores/auth-store'
import useSavedStore from '@/stores/saved-store'
import SavedView from '@/views/saved-view'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

function SavedPresenter() {
  const { user } = useAuthStore()
  const { saved, setSaved, savedLoading } = useSavedStore()

  useEffect(() => {
    if (user) setSaved(user.uid)
  }, [user, setSaved])

  const navigate = useNavigate()
  const onRowClick = (row: { symbol: string; name: string }) => {
    navigate({ to: `/details/$symbol`, params: { symbol: row.symbol } })
  }

  if (savedLoading) return Loading()

  return <SavedView savedData={Array.from(saved.values())} onRowClick={onRowClick} />
}

const Loading = () => {
  return (
    <div className='container '>
      <div className='flex justify-between py-6'>
        <h2 className='text-3xl font-semibold'>Saved</h2>
      </div>
      <div className='flex flex-col gap-2'>
        {Array.from({ length: 20 }).map((_, i) => (
          <Skeleton key={i} className='h-10' />
        ))}
      </div>
    </div>
  )
}

export default SavedPresenter
