import { cn } from '@/lib/utils'
import { Icons } from '../icons'
import { Button } from '../ui/button'
import { IconLoader2 } from '@tabler/icons-react'

interface GitHubButtonProps extends React.HTMLAttributes<HTMLElement> {
  loading?: boolean
}

const GitHubButton = ({ className, loading = false, ...props }: GitHubButtonProps) => {
  return (
    <Button variant='outline' type='button' className={cn(className)} disabled={loading} {...props}>
      {loading && <IconLoader2 className='mr-2 h-4 w-4 animate-spin' />}
      <Icons.gitHub className='mr-2 h-4 w-4' />
      GitHub
    </Button>
  )
}

export default GitHubButton
