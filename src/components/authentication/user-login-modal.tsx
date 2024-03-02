import { Label } from '@radix-ui/react-label'
import { Icons } from '../icons'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { useState } from 'react'

const UserLoginModal = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='absolute right-4 top-4 md:right-8 md:top-8' variant='ghost'>
          Login
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in to Dynfin</DialogTitle>
        </DialogHeader>
        <div className='grid grid-cols-2 gap-x-6'>
          <Button variant='outline' type='button'>
            <Icons.gitHub className='mr-2 h-4 w-4' />
            GitHub
          </Button>
          <Button variant='outline' type='button'>
            <Icons.google className='mr-2 h-4 w-4' />
            Google
          </Button>
        </div>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
          </div>
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='email' className='text-sm font-medium leading-none'>
            Email
          </Label>
          <Input placeholder='name@example.com' type='email' />
        </div>
        <div className='grid gap-2'>
          <Label className='text-sm font-medium leading-none' htmlFor='password'>
            Password
          </Label>
          <Input placeholder='Password' type='password' />
        </div>

        <DialogFooter>
          <Button className='w-full'>Sign In</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UserLoginModal
