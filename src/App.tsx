import { onAuthStateChanged } from 'firebase/auth'
import { Outlet, Link } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { initializeFirebase, useAuth } from './lib/firebase'
import useAuthStore from './stores/store'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  initializeFirebase()
  const auth = useAuth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      useAuthStore.setState({ user })
    })

    return unsubscribe
  }, [auth])

  return (
    <QueryClientProvider client={queryClient}>
      <div className='flex flex-col h-full'>
        <div className='p-2 flex gap-2'>
          <Link to='/' className='[&.active]:font-bold'>
            Home
          </Link>{' '}
          <Link to='/about' className='[&.active]:font-bold'>
            About
          </Link>
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </QueryClientProvider>
  )
}

export default App
