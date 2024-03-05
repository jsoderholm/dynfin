import UserAuthForm from '@/components/authentication/user-auth-form'
import UserAuthModal from '@/components/authentication/user-auth-modal'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/components/ui/use-toast'

const Authentication = () => {
  const { toast } = useToast()
  return (
    <>
      <div className='container relative hidden flex-1 flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <UserAuthModal />
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r'>
          <div className='absolute inset-0 bg-primary' />
          <div className='relative  flex items-center text-lg font-medium'>dynfin</div>
          <div className='relative  mt-auto'>
            <blockquote className='space-y-2'>
              <p className='text-lg'>
                &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at est nulla. Etiam tristique dolor
                magna, eget auctor elit vestibulum et. Curabitur accumsan lobortis dui venenatis tincidunt.&rdquo;
              </p>
              <footer className='text-sm'>DD2642 - Group 17</footer>
            </blockquote>
          </div>
        </div>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-center'>
              <h1 className='text-2xl font-semibold tracking-tight'>Create an account</h1>
              <p className='text-sm text-muted-foreground'>Enter your email below to create your account</p>
            </div>
            <UserAuthForm />
            <p className='px-8 text-center text-sm text-muted-foreground'>
              By clicking continue, you agree to our{' '}
              <Button
                variant='link'
                onClick={() =>
                  toast({
                    title: 'Terms of Service',
                    description: 'We do not have a terms of service yet.',
                  })
                }
                className='text-gray px-0 hover:no-underline hover:text-primary'
              >
                Terms of Service
              </Button>{' '}
              and{' '}
              <Button
                variant='link'
                onClick={() =>
                  toast({
                    title: 'Privacy Policy',
                    description: 'We do not have a privacy policy yet.',
                  })
                }
                className='text-gray px-0 hover:no-underline hover:text-primary'
              >
                Privacy Policy
              </Button>
              .
            </p>
            <Toaster />
          </div>
        </div>
      </div>
    </>
  )
}

export default Authentication
