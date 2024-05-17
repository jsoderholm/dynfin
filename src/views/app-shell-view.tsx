import Sidebar, { SidebarProps } from '../components/sidebar'
import Header, { HeaderProps } from '../components/header'

type AppShellProps = SidebarProps & HeaderProps

const AppShellView = (props: AppShellProps) => {
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

export default AppShellView
