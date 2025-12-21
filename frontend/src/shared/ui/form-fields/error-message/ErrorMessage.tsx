import { Collapse } from '@shared/ui/animation';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  isError: boolean;
  message: string | undefined;
}

export function ErrorMessage({ isError, message }: ErrorMessageProps) {
  return (
    <Collapse isOpen={isError}>
      <p className={styles.errorText}>{message}</p>
    </Collapse>
  );
}
