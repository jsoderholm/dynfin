import { IconSettings, IconLogout, IconUser, IconLoader2 } from '@tabler/icons-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { AuthState } from '@/stores/auth-store'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
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
import { Button, buttonVariants } from './ui/button'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { SettingsFormSchema } from '@/presenters/app-shell-presenter'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'

export type AvatarMenuProps = {
  user: AuthState['user']
  deleteUser: () => Promise<void>
  handleSignOut: () => void
  settingsForm: ReturnType<typeof useForm<z.infer<typeof SettingsFormSchema>>>
  onSave: (values: z.infer<typeof SettingsFormSchema>) => Promise<void>
  modalOpen: boolean
  onOpenChange: (open: boolean) => void
  deletingUser: boolean
}

const AvatarMenu = ({
  user,
  handleSignOut,
  onSave,
  settingsForm,
  modalOpen,
  onOpenChange,
  deleteUser,
  deletingUser,
}: AvatarMenuProps) => {
  return (
    <Dialog open={modalOpen} onOpenChange={onOpenChange}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={`/${user?.photoURL}` ?? ''} alt='avatar' />
            <AvatarFallback>
              <IconUser />
            </AvatarFallback>
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
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormDescription>This is your public avatar.</FormDescription>
                  <FormMessage />
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='grid max-w-md grid-cols-4 gap-8'
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
              {settingsForm.formState.isSubmitting && <IconLoader2 className='mr-2 h-4 w-4 animate-spin' />}
              Save
            </Button>
          </form>
        </Form>
        <DialogFooter>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className='w-full' variant='destructive'>
                {deletingUser && <IconLoader2 className='mr-2 h-4 w-4 animate-spin' />}
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteUser} className={buttonVariants({ variant: 'destructive' })}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DialogFooter>
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
          <img src={`/${avatar}`} className='rounded-full p-1' />
        </div>
      </FormLabel>
    </FormItem>
  )
}

export default AvatarMenu
