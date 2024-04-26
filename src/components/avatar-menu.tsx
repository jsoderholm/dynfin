import { IconSettings, IconLogout } from '@tabler/icons-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { AuthState } from '@/stores/auth-store'
import { Avatar, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface AvatarMenuProps {
  user: AuthState['user']
  handleSignOut: () => void
}

const AvatarMenu = ({ user, handleSignOut }: AvatarMenuProps) => {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src='/avatar.png' alt='avatar' />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='mx-4  my-5'>
          <DropdownMenuLabel>
            <div className='flex flex-col'>
              <p>My Account</p>
              <p className='text-muted-foreground'>{user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DialogTrigger asChild>
              <DropdownMenuItem className='cursor-pointer'>
                <IconSettings className='mr-3 h-5 w-5' />
                <span>Settings</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem onClick={handleSignOut} className='cursor-pointer'>
              <IconLogout className='mr-3 h-5 w-5' />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <DialogDescription>Manage your account settings here.</DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default AvatarMenu
