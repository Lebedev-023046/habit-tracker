import { Container } from '../container';
import { Typography } from '../typography';

import styles from './AuthFormShell.module.css';

interface AuthFormShellProps {
  title: string;
  onSubmit: () => void;
  children: React.ReactNode;
  controls: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthFormShell({
  title,
  onSubmit,
  children,
  controls,
  footer,
}: AuthFormShellProps) {
  return (
    <Container className={styles.shell}>
      <Typography variant="pageTitle">{title}</Typography>
      <form onSubmit={onSubmit} className={styles.form}>
        {children}

        <div className={styles.controls}>{controls}</div>
      </form>
      <div className={styles.footer}>{footer}</div>
    </Container>
  );
}
