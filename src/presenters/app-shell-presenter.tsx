import AppShell from '@/components/app-shell'
import useAuthStore from '@/stores/auth-store'
import { Outlet, useNavigate } from '@tanstack/react-router'

const AppShellPresenter = () => {
  const navigate = useNavigate()

  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  async function handleSignOut() {
    try {
      await logout()
      navigate({ to: '/authentication' })
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <AppShell user={user} handleSignOut={handleSignOut}>
      <Outlet />
    </AppShell>
  )
}

export default AppShellPresenter
