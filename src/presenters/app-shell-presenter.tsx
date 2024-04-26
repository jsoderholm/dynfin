import AppShell from '@/components/app-shell'
import useAuthStore from '@/stores/auth-store'
import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router'
import { create } from 'zustand'

export interface SidebarState {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const useSidebarStore = create<SidebarState>((set) => ({
  collapsed: false,
  setCollapsed: (collapsed: boolean) => set({ collapsed }),
}))

const AppShellPresenter = () => {
  const navigate = useNavigate()

  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const { collapsed, setCollapsed } = useSidebarStore()
  const router = useRouterState()
  const hideBackButton = router.location.pathname === '/' || router.location.pathname === '/saved'

  async function handleSignOut() {
    try {
      await logout()
      navigate({ to: '/authentication' })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <AppShell
      user={user}
      handleSignOut={handleSignOut}
      collapsed={collapsed}
      setCollapsed={setCollapsed}
      hideBackButton={hideBackButton}
    >
      <Outlet />
    </AppShell>
  )
}

export default AppShellPresenter
