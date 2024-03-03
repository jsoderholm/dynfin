import { onAuthStateChanged } from 'firebase/auth'
import Authentication from './views/authentication'
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
      <Authentication />
    </QueryClientProvider>
  )
}

export default App
