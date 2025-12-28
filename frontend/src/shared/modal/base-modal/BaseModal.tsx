import { Container } from '@/shared/ui/container';
import styles from './BaseModal.module.css';

// src/shared/modal/BaseModal.tsx
import { useEsc } from '@/shared/hooks/useEsc';
import { motion } from 'motion/react';
import { type ReactNode } from 'react';
import ReactDOM from 'react-dom';
import {
  backdropVariants,
  modalTransition,
  modalVariants,
} from '../animations/modal.animations';
import { modalBackdropTransition } from '../animations/modal.transitions';

interface BaseModalProps {
  children: ReactNode;
  onClose: () => void;
}

export const BaseModal = ({ children, onClose }: BaseModalProps) => {
  const modalRoot = document.getElementById('modal-root');
  useEsc({ callback: onClose });

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <motion.div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={modalBackdropTransition}
    >
      <motion.div
        variants={modalVariants}
        transition={modalTransition}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={e => e.stopPropagation()}
      >
        <Container as="div" className={styles.modal}>
          {children}
        </Container>
      </motion.div>
    </motion.div>,

    modalRoot,
  );
};
