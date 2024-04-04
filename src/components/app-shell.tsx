import Sidebar, { SidebarProps } from './sidebar'
import MobileMenu, { MobileMenuProps } from './mobile-menu'

type AppShellProps = SidebarProps & MobileMenuProps

const AppShell = (props: AppShellProps) => {
  const { user, children } = props

  return (
    <div className='flex'>
      {user && <Sidebar {...props} className='hidden md:block' />}
      <div className='flex-1 h-screen bg-muted/40'>
        {user && <MobileMenu {...props} className='md:hidden' />}
        {children}
      </div>
    </div>
  )
}

export default AppShell
