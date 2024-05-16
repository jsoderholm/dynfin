import { AuthState } from '@/stores/auth-store'
import { IconLayoutSidebar, IconHexagonLetterD, IconNews, IconHeart, IconArrowLeft } from '@tabler/icons-react'
import React from 'react'
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, Sheet } from './ui/sheet'
import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import AvatarMenu, { AvatarMenuProps } from './avatar-menu'
import { ModeToggle, ModeToggleProps } from './mode-toggle'

export type HeaderProps = {
  className?: string
  user: AuthState['user']
  hideBackButton: boolean
  handleSignOut: () => void
} & React.HTMLAttributes<HTMLElement> &
  AvatarMenuProps &
  ModeToggleProps

const Header = (props: HeaderProps) => {
  const { className, hideBackButton } = props

  return (
    <header className={cn('sticky flex top-0 z-10 border-b h-16', className)}>
      <div className={cn('flex items-center flex-1 justify-between h-full px-4', hideBackButton && 'md:justify-end')}>
        <div className='md:hidden'>
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
        </div>
        <Link to='/' className={cn('hidden md:block', hideBackButton && 'md:hidden')}>
          <Button variant='ghost' size='icon'>
            <IconArrowLeft />
          </Button>
        </Link>
        <div className='flex items-center space-x-4'>
          <ModeToggle {...props} />
          <AvatarMenu {...props} />
        </div>
      </div>
    </header>
  )
}

export default Header
