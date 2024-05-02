import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { useState } from 'react'

interface SettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SettingsModal = ({ open, onOpenChange }: SettingsModalProps) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState()

  const handleDeleteAccount = () => {
    const confirmDeletetion = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.',
    )
    if (confirmDeletetion) {
      //TODO
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>Settings</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <DialogDescription>Manage your account settings here.</DialogDescription>
        {showConfirmDialog && (
          <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Account Deletion</DialogTitle>
              </DialogHeader>
              <DialogDescription>Are you sure you want to delete your account permanently?</DialogDescription>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <Button style={{ marginRight: '10px' }} onClick={() => setShowConfirmDialog(false)}>
                  Cancel
                </Button>
                <Button variant='danger' onClick={handleDeleteAccount}>
                  Delete
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default SettingsModal
