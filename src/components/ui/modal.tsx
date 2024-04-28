import React from 'react'
import ReactDOM from 'react-dom'

interface ModalProps {
  isOpen: boolean
  children: React.ReactNode
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null

  const modalRoot = document.getElementById('modal-root') // Ensure this element exists in your HTML

  return ReactDOM.createPortal(
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton}>
          ×
        </button>
        {children}
      </div>
    </div>,
    modalRoot,
  )
}

const styles: {
  overlay: React.CSSProperties
  modal: React.CSSProperties
  closeButton: React.CSSProperties
} = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    maxWidth: '500px',
    maxHeight: '80%',
    overflowY: 'auto',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '1.5em',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
}

export default Modal
