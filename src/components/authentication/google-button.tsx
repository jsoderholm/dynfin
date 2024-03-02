import { Button } from '../ui/button'
import { Icons } from '../icons'

const GoogleButton = () => {
  return (
    <Button variant='outline' type='button'>
      <Icons.google className='mr-2 h-4 w-4' />
      Google
    </Button>
  )
}

export default GoogleButton
