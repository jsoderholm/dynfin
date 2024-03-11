import { Button } from '../ui/button'
import { Icons } from '../icons'
import { cn } from '@/lib/utils'

const GoogleButton = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <Button variant='outline' type='button' className={cn(className)} {...props}>
      <Icons.google className='mr-2 h-4 w-4' />
      Google
    </Button>
  )
}

export default GoogleButton
