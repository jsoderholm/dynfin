import { Button } from '../ui/button'
import { Input } from '../ui/input'
import GitHubButton from './github-button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { AuthFormSchema } from '@/presenters/authentication-presenter'

export type UserAuthFormProps = {
  registerForm: ReturnType<typeof useForm<z.infer<typeof AuthFormSchema>>>
  onRegister: (values: z.infer<typeof AuthFormSchema>) => Promise<void>
  onGitHub: () => Promise<void>
}

const UserAuthForm = ({ registerForm, onRegister, onGitHub }: UserAuthFormProps) => {
  return (
    <div className='grid gap-6'>
      <Form {...registerForm}>
        <form onSubmit={registerForm.handleSubmit(onRegister)} className='grid gap-2'>
          <FormField
            control={registerForm.control}
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
            control={registerForm.control}
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
      <GitHubButton onClick={onGitHub} />
    </div>
  )
}

export default UserAuthForm
