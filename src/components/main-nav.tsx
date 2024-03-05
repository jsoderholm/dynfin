import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6 text-muted-foreground font-medium', className)}
      {...props}
    >
      <Link to='/' className='text-sm  transition-colors hover:text-primary' activeProps={{ className: 'text-black' }}>
        Browse
      </Link>
      <Link
        to='/news'
        className='text-sm  transition-colors hover:text-primary'
        activeProps={{ className: 'text-black' }}
      >
        News
      </Link>
      <Link
        to='/saved'
        className='text-sm  transition-colors hover:text-primary'
        activeProps={{ className: 'text-black' }}
      >
        Saved
      </Link>
    </nav>
  )
}
