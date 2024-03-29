import { cn } from '@/lib/utils'
import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import GitHubButton from './github-button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useAuth } from '@/lib/firebase'
import { useCreateUser, useGitHubSignIn } from '@/hooks/auth'
import useAuthStore from '@/stores/auth-store'
import { useNavigate } from '@tanstack/react-router'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
  const auth = useAuth()
  const navigate = useNavigate()
  const { mutate } = useCreateUser()
  const { mutate: mutateGitHub } = useGitHubSignIn()

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
      },
    )
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
      <GitHubButton
        onClick={() =>
          mutateGitHub(auth, {
            onSuccess: (data) => {
              useAuthStore.setState({ user: data.user })
              navigate({ to: '/' })
            },
          })
        }
      />
    </div>
  )
}

export default UserAuthForm
