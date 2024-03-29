import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/globals.css'
import '@/styles/index.css'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { Icons } from './components/icons'

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />,
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    <div className='flex flex-col h-full'>
      <RouterProvider router={router} defaultPreload='intent' />
    </div>
  )
}

const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
