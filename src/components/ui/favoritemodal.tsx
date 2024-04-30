import React from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog' // Adjust the import path as necessary
import { IconHeart, IconHeartFilled } from '@tabler/icons-react' // Assuming you use these icons

const FavoriteModal = ({ isOpen, onClose, tickers, toggleFavorite, isFavorited }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tickers in the News</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <table>
            <tbody>
              {tickers.map((ticker) => (
                <tr key={ticker}>
                  <td>{ticker}</td>
                  <td onClick={() => toggleFavorite(ticker)}>
                    {isFavorited(ticker) ? <IconHeartFilled /> : <IconHeart />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <button className='button'>Close</button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FavoriteModal
