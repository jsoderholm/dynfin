import { cn } from '@/lib/utils'
import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import GitHubButton from './github-button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { auth } from '@/lib/firebase'
import { useNavigate } from '@tanstack/react-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { signInUserGitHub } from '@/lib/auth'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  function onSubmit(values: z.infer<typeof schema>) {
    const { email, password } = values
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate({ to: '/' })
      })
      .catch((e) => console.log(e))
  }

  async function signInWithGitHub() {
    try {
      await signInUserGitHub(auth)
      navigate({ to: '/' })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
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
          <Button type='submit' className='my-2'>
            Create Account
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
      <GitHubButton onClick={() => signInWithGitHub()} />
    </div>
  )
}

export default UserAuthForm
