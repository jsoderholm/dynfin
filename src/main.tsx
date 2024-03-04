import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@/styles/globals.css'
import '@/styles/index.css'
import { createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router'
import Authentication from './views/authentication.tsx'

const rootRoute = createRootRoute({
  component: () => <App />,
})
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    return <Authentication />
  },
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: function About() {
    return <div className='p-2'>Hello from About!</div>
  },
})

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  )
}
