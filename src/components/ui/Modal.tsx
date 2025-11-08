import React from 'react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'primary' | 'error';
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card rounded-xl p-6 mx-4 max-w-md w-full shadow-2xl border border-input/20">
        {children}
      </div>
    </div>
  );
};

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'primary'
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className="text-center">
        <h3 className="text-h5 font-semibold text-white mb-4">
          {title}
        </h3>
        <p className="text-body text-white/80 mb-6">
          {message}
        </p>
        <div className="flex gap-3 justify-center">
          <Button
            variant="secondary"
            onClick={onCancel}
            className="px-6"
          >
            {cancelText}
          </Button>
          <Button
            variant={variant === 'error' ? 'error' : 'primary'}
            onClick={onConfirm}
            className="px-6"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Modal;