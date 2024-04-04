import { AuthState } from '@/stores/auth-store'
import React from 'react'
import Sidebar from './sidebar'

interface AppShellProps {
  children: React.ReactNode
  user: AuthState['user']
  handleSignOut: () => void
}

const AppShell = ({ children, user, handleSignOut }: AppShellProps) => {
  return (
    <div className='flex'>
      {user && <Sidebar handleSignOut={handleSignOut} />}
      <div className='flex-1 bg-muted/40'>{children}</div>
    </div>
  )
}

export default AppShell
