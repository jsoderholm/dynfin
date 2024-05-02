import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog'

interface NewsModalProps {
  title: string
  content: string
}

const NewsModal: React.FC<NewsModalProps> = ({ title, content }) => {
  if (!isOpen) return null
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost'>Read more</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <p>{content}</p>
        <DialogClose asChild>
          <button variant='ghost'>{`x`}</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default NewsModal
