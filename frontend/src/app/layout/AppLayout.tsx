// import { Footer } from '@/widgets/footer/Footer';
// import { Header } from '@/widgets/header/Header';

import { GlobalFallback } from '@/shared/ui/error-boundary/global-fallback';
import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from '../../shared/ui/error-boundary';
import styles from './AppLayout.module.css';

const Header = lazy(() =>
  import('@/widgets/header/Header').then(m => ({ default: m.Header })),
);
const Footer = lazy(() =>
  import('@/widgets/footer/Footer').then(m => ({ default: m.Footer })),
);

export default function AppLayout() {
  return (
    <div className={styles.wrapper}>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <main className={styles.main}>
        <ErrorBoundary fallback={error => <GlobalFallback error={error} />}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
