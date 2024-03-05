import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/globals.css'
import '@/styles/index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { onAuthStateChanged } from 'firebase/auth'
import { initializeFirebase, useAuth } from './lib/firebase'
import { routeTree } from './routeTree.gen'
import useAuthStore from './stores/auth-store'
import { Icons } from './components/icons'

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />,
  defaultPreload: 'intent',
  context: { auth: undefined! },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

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
    <div className='flex flex-col h-full'>
      <RouterProvider router={router} defaultPreload='intent' context={{ auth }} />
    </div>
  )
}

const queryClient = new QueryClient()

const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>,
  )
}
