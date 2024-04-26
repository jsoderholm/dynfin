import Sidebar, { SidebarProps } from './sidebar'
import Header, { HeaderProps } from './header'

type AppShellProps = SidebarProps & HeaderProps

const AppShell = (props: AppShellProps) => {
  const { user, children } = props

  return (
    <div className='flex'>
      {user && <Sidebar {...props} className='hidden md:block' />}
      <div className='flex-1 bg-muted/40'>
        {user && <Header {...props} />}
        {children}
      </div>
    </div>
  )
}

export default AppShell
