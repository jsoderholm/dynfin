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
import { useNavigate } from '@tanstack/react-router'

interface AppShellProps {
  children: React.ReactNode
}

const AppShell = ({ children }: AppShellProps) => {
  const auth = useAuth()
  const user = useAuthStore((state) => state.user)
  const { mutate } = useSignOutUser()
  const navigate = useNavigate()

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
                    <Avatar className='h-10 w-10'>
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56' align='end' forceMount>
                  <DropdownMenuLabel className='font-normal'>
                    <div className='flex flex-col space-y-1'>
                      <p className='text-sm font-medium leading-none'>User</p>
                      <p className='text-xs leading-none text-muted-foreground'>{user.email}</p>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className='cursor-pointer'
                    onClick={() => mutate(auth, { onSuccess: () => navigate({ to: '/authentication' }) })}
                  >
                    Log out
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
