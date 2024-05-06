import AppShell from '@/components/app-shell'
import useAuthStore from '@/stores/auth-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router'
import { updateProfile } from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { create } from 'zustand'

export interface SidebarState {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const useSidebarStore = create<SidebarState>((set) => ({
  collapsed: false,
  setCollapsed: (collapsed: boolean) => set({ collapsed }),
}))

interface SettingsModalState {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const useSettingsModalStore = create<SettingsModalState>((set) => ({
  open: false,
  onOpenChange: (open: boolean) => set({ open }),
}))

export const SettingsFormSchema = z.object({
  username: z.string().min(5, {
    message: 'Username must be at least 5 characters.',
  }),
  avatar: z.string().optional(),
})

const AppShellPresenter = () => {
  const navigate = useNavigate()

  const { user, logout, deleteUser } = useAuthStore()
  const { collapsed, setCollapsed } = useSidebarStore()
  const { open, onOpenChange } = useSettingsModalStore()
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

  const settingsForm = useForm<z.infer<typeof SettingsFormSchema>>({
    resolver: zodResolver(SettingsFormSchema),
    defaultValues: {
      username: user?.displayName ?? '',
    },
  })

  async function onSubmit(values: z.infer<typeof SettingsFormSchema>) {
    if (!user) {
      return
    }
    const { username, avatar } = values
    await updateProfile(user, { displayName: username, photoURL: avatar })
    onOpenChange(false)
  }

  return (
    <AppShell
      user={user}
      handleSignOut={handleSignOut}
      collapsed={collapsed}
      setCollapsed={setCollapsed}
      hideBackButton={hideBackButton}
      settingsForm={settingsForm}
      onSave={onSubmit}
      modalOpen={open}
      onOpenChange={onOpenChange}
      deleteUser={deleteUser}
    >
      <Outlet />
    </AppShell>
  )
}

export default AppShellPresenter
