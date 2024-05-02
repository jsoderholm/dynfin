import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'

import React from 'react'
import { IconArrowRight, IconHeart, IconHexagonLetterD, IconNews } from '@tabler/icons-react'
import { Button } from './ui/button'
import { SidebarState } from '@/presenters/app-shell-presenter'

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
  collapsed: SidebarState['collapsed']
  setCollapsed: SidebarState['setCollapsed']
}

const Sidebar = ({ className, collapsed, setCollapsed }: SidebarProps) => {
  return (
    <aside className={cn('h-screen sticky top-0 w-48 transition-all duration-200', collapsed && 'w-28', className)}>
      <div className='flex h-full flex-col overflow-y-auto border-r px-3 py-4'>
        <Link to='/' className='mb-10 flex items-center mx-auto px-3 py-2'>
          <IconHexagonLetterD className='h-12 w-12' />
          <span className={cn('ml-3 text-xl font-medium transition-transform duration-100', collapsed && 'hidden')}>
            dynfin
          </span>
        </Link>
        <ul className='space-y-2 text-sm font-medium'>
          <li>
            <Link
              to='/'
              className='flex items-center rounded-md px-3 py-2 hover:bg-accent'
              activeProps={{ className: 'bg-accent' }}
            >
              <IconNews className='h-6 w-6 mx-auto' />
              <span className={cn('flex-1 ml-3 whitespace-nowrap', collapsed && 'hidden')}>Browse</span>
            </Link>
          </li>

          <li>
            <Link
              to='/saved'
              className='flex items-center rounded-md px-3 py-2 hover:bg-accent'
              activeProps={{ className: 'bg-accent' }}
            >
              <IconHeart className='h-6 w-6 mx-auto' />
              <span className={cn('flex-1 ml-3 whitespace-nowrap', collapsed && 'hidden')}>Saved</span>
            </Link>
          </li>
        </ul>
        <Button className='w-full mt-auto' variant='ghost' onClick={() => setCollapsed(!collapsed)}>
          <IconArrowRight className={cn('h-6 w-6', collapsed ? 'rotate-0' : 'rotate-180')} />
          <span className={cn('ml-3 whitespace-nowrap', collapsed && 'hidden')}>Collapse</span>
        </Button>
      </div>
    </aside>
  )
}

export default Sidebar
