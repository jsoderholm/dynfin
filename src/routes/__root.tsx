import AppShell from '@/components/app-shell'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Auth } from 'firebase/auth'

interface RouterContext {
  auth: Auth
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <AppShell>
        <Outlet />
      </AppShell>
      <TanStackRouterDevtools />
    </>
  ),
})
