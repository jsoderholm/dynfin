import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import GitHubButton from './github-button'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form'
import { z } from 'zod'
import { schema } from '@/presenters/authentication-presenter'

export type UserAuthModalProps = {
  form: ReturnType<typeof useForm<z.infer<typeof schema>>>
  onLogin: (values: z.infer<typeof schema>) => Promise<void>
  onGitHub: () => Promise<void>
  open: boolean
  onOpenChange: (open: boolean) => void
}

const UserAuthModal = ({ form, onLogin, onGitHub, open, onOpenChange }: UserAuthModalProps) => {
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onLogin)} className='grid gap-2'>
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
            <Button type='submit' className='my-2'>
              Sign In
            </Button>
          </form>
        </Form>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
          </div>
        </div>
        <GitHubButton onClick={onGitHub} />
      </DialogContent>
    </Dialog>
  )
}

export default UserAuthModal
