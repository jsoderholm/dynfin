import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'

import React from 'react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from './ui/navigation-menu'
import { cva } from 'class-variance-authority'

const Nav = ({ className }: React.HTMLAttributes<HTMLElement>) => {
  const navigationMenuStyle = cva(
    'px-4 py-2 h-10 group inline-flex w-max rounded-md text-sm items-center transition-colors hover:bg-accent hover:text-accent-foreground',
  )
  return (
    <NavigationMenu>
      <NavigationMenuList className={cn('flex items-center space-x-2 lg:space-4 font-medium', className)}>
        <NavigationMenuItem>
          <Link to='/' className={navigationMenuStyle()} activeProps={{ className: 'bg-accent' }}>
            Browse
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to='/saved' className={navigationMenuStyle()} activeProps={{ className: 'bg-accent' }}>
            Saved
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Nav
