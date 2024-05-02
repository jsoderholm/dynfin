import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { Button } from './ui/button'

interface NewsModalProps {
  title: string
  content: string
}

const NewsModal: React.FC<NewsModalProps> = ({ title, content }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost'>Read more</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <p>{content}</p>
        <DialogClose asChild>
          <button variant='ghost'>x</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default NewsModal