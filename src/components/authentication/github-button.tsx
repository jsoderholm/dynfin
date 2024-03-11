import { cn } from '@/lib/utils'
import { Icons } from '../icons'
import { Button } from '../ui/button'

const GitHubButton = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <Button variant='outline' type='button' className={cn(className)} {...props}>
      <Icons.gitHub className='mr-2 h-4 w-4' />
      GitHub
    </Button>
  )
}

export default GitHubButton
