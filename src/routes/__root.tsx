import AppShellPresenter from '@/presenters/app-shell-presenter'
import { createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <AppShellPresenter />
      <TanStackRouterDevtools />
    </>
  ),
})
