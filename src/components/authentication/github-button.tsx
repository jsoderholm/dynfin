import { Icons } from '../icons'
import { Button } from '../ui/button'

const GitHubButton = () => {
  return (
    <Button variant='outline' type='button'>
      <Icons.gitHub className='mr-2 h-4 w-4' />
      GitHub
    </Button>
  )
}

export default GitHubButton
