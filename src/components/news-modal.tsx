import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const NewsModal: React.FC<NewsModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <p>{content}</p>
        <DialogClose asChild>
          <button variant='ghost'>{`Close`}</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default NewsModal;
