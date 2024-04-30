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
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { useForm } from 'react-hook-form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { SettingsFormSchema } from '@/presenters/app-shell-presenter'

export type AvatarMenuProps = {
  user: AuthState['user']
  handleSignOut: () => void
  settingsForm: ReturnType<typeof useForm<z.infer<typeof SettingsFormSchema>>>
  onSave: (values: z.infer<typeof SettingsFormSchema>) => Promise<void>
  modalOpen: boolean
  onOpenChange: (open: boolean) => void
}

const AvatarMenu = ({ user, handleSignOut, onSave, settingsForm, modalOpen, onOpenChange }: AvatarMenuProps) => {
  return (
    <Dialog open={modalOpen} onOpenChange={onOpenChange}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user?.photoURL ?? ''} alt='avatar' />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='mx-4  my-5'>
          <DropdownMenuLabel>
            <div className='flex flex-col'>
              <p>{user?.displayName ?? 'My Account'}</p>
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
        <Form {...settingsForm}>
          <form onSubmit={settingsForm.handleSubmit(onSave)} className='space-y-6'>
            <FormField
              control={settingsForm.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormControl>
                    <Input placeholder='Username' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={settingsForm.control}
              name='avatar'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Avatar</FormLabel>
                  <FormDescription>This is your public avatar.</FormDescription>
                  <FormMessage />
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='grid max-w-md grid-cols-4 gap-8 pt-2'
                  >
                    <AvatarFormItem avatar='avatar1.png' />
                    <AvatarFormItem avatar='avatar2.png' />
                    <AvatarFormItem avatar='avatar3.png' />
                    <AvatarFormItem avatar='avatar4.png' />
                  </RadioGroup>
                </FormItem>
              )}
            />
            <Button type='submit' disabled={!settingsForm.formState.isDirty} className='w-full'>
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

interface AvatarFormItemProps {
  avatar: string
}

const AvatarFormItem = ({ avatar }: AvatarFormItemProps) => {
  return (
    <FormItem>
      <FormLabel className='[&:has([data-state=checked])>div]:border-primary'>
        <FormControl>
          <RadioGroupItem value={avatar} className='sr-only' />
        </FormControl>
        <div className='rounded-full border-2 border-muted hover:border-primary cursor-pointer'>
          <img src={avatar} className='rounded-full p-1' />
        </div>
      </FormLabel>
    </FormItem>
  )
}

export default AvatarMenu
