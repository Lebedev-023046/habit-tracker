import type { ModalBaseProps } from '@/shared/modal/types';
import { Typography } from '@/shared/ui/typography';
import { Form } from '../form';
import styles from './Modal.module.css';

export interface ModalProps extends ModalBaseProps {
  title?: string;
  subtitle?: string;
  habitId: string;
}

export function Modal({
  subtitle = 'Choose how long you want to build this habit',
  habitId,
  close,
}: ModalProps) {
  return (
    <>
      <div className={styles.header}>
        <Typography variant="bodyMuted">{subtitle}</Typography>
      </div>
      <Form habitId={habitId} onSuccess={close} onCancel={close} />
    </>
  );
}
