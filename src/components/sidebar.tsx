import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'

import React from 'react'
import { IconHeart, IconLogout, IconNews } from '@tabler/icons-react'
import { Button } from './ui/button'

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
  handleSignOut: () => void
}

const Sidebar = ({ className, handleSignOut }: SidebarProps) => {
  return (
    <aside className={cn('h-screen sticky top-0 w-48 transition-transform', className)}>
      <div className='flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4'>
        <div className='mb-10 flex items-center rounded-lg px-3 py-2 '>
          <span className='text-lg font-medium'>dynfin</span>
        </div>
        <ul className='space-y-2 text-sm font-medium'>
          <li>
            <Link
              to='/'
              className='flex items-center rounded-md px-3 py-2 hover:bg-accent'
              activeProps={{ className: 'bg-accent' }}
            >
              <IconNews className='h-5 w-5 mr-3' />
              <span className='flex-1 whitespace-nowrap'>Browse</span>
            </Link>
          </li>

          <li>
            <Link
              to='/saved'
              className='flex items-center rounded-md px-3 py-2 hover:bg-accent'
              activeProps={{ className: 'bg-accent' }}
            >
              <IconHeart className='h-5 w-5 mr-3' />
              <span className='flex-1 whitespace-nowrap'>Saved</span>
            </Link>
          </li>
        </ul>
        <div className='flex items-center mt-auto'>
          <Button className='flex-1' variant='ghost' onClick={handleSignOut}>
            <IconLogout className='h-5 w-5 mr-3' />
            <span className=' whitespace-nowrap'>Logout</span>
          </Button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
