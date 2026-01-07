import { type PropsWithChildren } from 'react';

import styles from './AuthLayout.module.css';

export default function AuthLayout({ children }: PropsWithChildren) {
  return <div className={styles.root}>{children}</div>;
}
