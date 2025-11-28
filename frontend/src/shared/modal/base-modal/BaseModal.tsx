import { Container } from '@/shared/ui/container';
import styles from './BaseModal.module.css';

// src/shared/modal/BaseModal.tsx
import { useEffect, type ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface BaseModalProps {
  children: ReactNode;
  onClose: () => void;
}

export const BaseModal = ({ children, onClose }: BaseModalProps) => {
  const modalRoot = document.getElementById('modal-root');

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      aria-modal="true"
      role="dialog"
      className={styles.backdrop}
      onClick={onClose}
    >
      <Container
        as="div"
        className={styles.modal}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </Container>
    </div>,

    modalRoot,
  );
};
