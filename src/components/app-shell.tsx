import useAuthStore from '@/stores/auth-store'
import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { useSignOutUser } from '@/hooks/auth'
import { useAuth } from '@/lib/firebase'
import Nav from './nav'

interface AppShellProps {
  children: React.ReactNode
}

const AppShell = ({ children }: AppShellProps) => {
  const auth = useAuth()
  const user = useAuthStore((state) => state.user)
  const { mutate } = useSignOutUser()

  return (
    <div className='flex flex-col flex-1'>
      {user && (
        <div className='border-b'>
          <div className='flex h-16 items-center px-4'>
            <Nav />
            <div className='ml-auto flex items-center space-x-4'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='relative h-10 w-10 rounded-full'>
                    <Avatar>
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => mutate(auth, { onSuccess: () => useAuthStore.setState({ user: null }) })}
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  )
}

export default AppShell
