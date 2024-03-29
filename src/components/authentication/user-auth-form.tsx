import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import GitHubButton from './github-button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { auth } from '@/lib/firebase'
import { useGitHubSignIn } from '@/hooks/auth'
import useAuthStore from '@/stores/auth-store'
import { useNavigate } from '@tanstack/react-router'
import { schema } from '@/presenters/authentication-presenter'

export type UserAuthFormProps = {
  form: ReturnType<typeof useForm<z.infer<typeof schema>>>
  onRegister: (values: z.infer<typeof schema>) => Promise<void>
  // onsubmit
  // github
} & React.HTMLAttributes<HTMLDivElement>

const UserAuthForm = ({ form, onRegister }: UserAuthFormProps) => {
  const navigate = useNavigate()
  const { mutate: mutateGitHub } = useGitHubSignIn()

  return (
    <div className='grid gap-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onRegister)} className='grid gap-2'>
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
