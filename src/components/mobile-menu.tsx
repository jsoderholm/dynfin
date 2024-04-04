import { AuthState } from '@/stores/auth-store'
import { IconLayoutSidebar, IconHexagonLetterD, IconNews, IconHeart, IconLogout } from '@tabler/icons-react'
import React from 'react'
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, Sheet } from './ui/sheet'
import { Link } from '@tanstack/react-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarImage } from './ui/avatar'
import { cn } from '@/lib/utils'

export interface MobileMenuProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
  user: AuthState['user']
  handleSignOut: () => void
}

const MobileMenu = ({ className, user, handleSignOut }: MobileMenuProps) => {
  return (
    <header className={cn('sticky flex top-0 bg-white border-b h-16 md:hidden', className)}>
      <div className='flex items-center flex-1 justify-between h-full px-4'>
        <Sheet>
          <SheetTrigger asChild>
            <IconLayoutSidebar className='h-8 w-8' />
          </SheetTrigger>
          <SheetContent side='left' className='w-3/5'>
            <SheetHeader>
              <SheetTitle className='flex justify-center items-center space-x-2'>
                <IconHexagonLetterD className='h-10 w-10' />
                <span className='text-xl'>dynfin</span>
              </SheetTitle>
            </SheetHeader>
            <nav className='grid gap-6 text-lg font-medium mt-8'>
              <Link
                to='/'
                className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                activeProps={{ className: 'text-black' }}
              >
                <IconNews className='h-6 w-6' />
                <span>Browse</span>
              </Link>
              <Link
                to='/saved'
                className='flex items-center gap-4 px-2.5 text-muted-foreground'
                activeProps={{ className: 'text-black' }}
              >
                <IconHeart className='h-6 w-6' />
                Saved
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src='/avatar.png' alt='avatar' />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56 mx-4 my-5'>
            <DropdownMenuLabel>
              <div className='flex flex-col'>
                <p>My Account</p>
                <p className='text-muted-foreground'>{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleSignOut}>
                <IconLogout className='mr-3 h-5 w-5' />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default MobileMenu
