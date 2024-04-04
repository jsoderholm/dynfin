import AppShell from '@/components/app-shell'
import useAuthStore from '@/stores/auth-store'
import { Outlet, useNavigate } from '@tanstack/react-router'
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

  async function handleSignOut() {
    try {
      await logout()
      navigate({ to: '/authentication' })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <AppShell user={user} handleSignOut={handleSignOut} collapsed={collapsed} setCollapsed={setCollapsed}>
      <Outlet />
    </AppShell>
  )
}

export default AppShellPresenter
