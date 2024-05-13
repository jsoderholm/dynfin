import { Skeleton } from '@/components/ui/skeleton'
import useAuthStore from '@/stores/auth-store'
import useSavedStore from '@/stores/saved-store'
import SavedView from '@/views/saved-view'
import { useEffect } from 'react'

function SavedPresenter() {
  const { user } = useAuthStore()
  const { saved, setSaved, savedLoading } = useSavedStore()

  useEffect(() => {
    if (user) setSaved(user.uid)
  }, [user, setSaved])

  if (savedLoading) return Loading()

  return <SavedView savedData={Array.from(saved.values())} />
}

const Loading = () => {
  return (
    <div className='container '>
      <div className='flex justify-between py-6'>
        <h2 className='text-3xl font-semibold'>Saved</h2>
      </div>
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className='h-64' />
        ))}
      </div>
    </div>
  )
}

export default SavedPresenter
