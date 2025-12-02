import { Footer } from '@/widgets/footer/Footer';
import { Header } from '@/widgets/header/Header';

import { GlobalFallback } from '@/shared/ui/global-fallback';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from '../../shared/ui/error-boundary';
import styles from './AppLayout.module.css';

export default function AppLayout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <ErrorBoundary fallback={error => <GlobalFallback error={error} />}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
