import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import GoogleButton from './google-button'
import GitHubButton from './github-button'
import { create } from 'zustand'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form'
import { useSignInUser } from '@/hooks/auth'
import { useAuth } from '@/lib/firebase'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from '@tanstack/react-router'
import useAuthStore from '@/stores/auth-store'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

interface UserLoginModalState {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const useModalStore = create<UserLoginModalState>((set) => ({
  open: false,
  onOpenChange: (open: boolean) => set({ open }),
}))

const UserAuthModal = () => {
  const { open, onOpenChange } = useModalStore()
  const navigate = useNavigate()

  const auth = useAuth()
  const { mutate } = useSignInUser()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  function onSubmit(values: z.infer<typeof schema>) {
    const { email, password } = values
    mutate(
      { auth, email, password },
      {
        onSuccess: (data) => {
          useAuthStore.setState({ user: data.user })
          navigate({ to: '/' })
        },
        onError: (e) => {
          console.log(e)
        },
      },
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <GitHubButton />
          <GoogleButton />
        </div>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='name@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='Password' type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Sign In</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UserAuthModal
