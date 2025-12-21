import type { ModalBaseProps } from '@/shared/modal/types';
import { Button } from '@/shared/ui/button';
import { Typography } from '@/shared/ui/typography';
import { useEffect, useRef } from 'react';
import styles from './ConfirmModal.module.css';

export interface ConfirmModalProps extends ModalBaseProps {
  title?: string;
  subtitle?: string;

  confirmText?: string;
  cancelText?: string;

  confirmVariant?: 'neutral' | 'danger' | 'primary';
  isLoading?: boolean;

  onConfirm: () => void;
  onCancel?: () => void;
}

export function ConfirmModal({
  title,
  subtitle,

  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'neutral',
  isLoading = false,

  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const primaryActionRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    primaryActionRef.current?.focus();
  }, []);

  const handleCancel = () => {
    onCancel?.();
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <>
      <div className={styles.header}>
        {title && <Typography variant="cardTitle">{title}</Typography>}
        {subtitle && <Typography variant="bodyMuted">{subtitle}</Typography>}
      </div>

      <div className={styles.actions}>
        <Button
          variant="ghost"
          animation="none"
          disabled={isLoading}
          onClick={handleCancel}
        >
          {cancelText}
        </Button>

        <Button
          ref={primaryActionRef}
          variant={confirmVariant}
          disabled={isLoading}
          onClick={handleConfirm}
        >
          {confirmText}
        </Button>
      </div>
    </>
  );
}
