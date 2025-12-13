import { ModalProvider } from '@/shared/modal/modal-context';

import { lazy, Suspense } from 'react';
import { ReactQueryProvider } from './react-query';
import { SkeletonWrapper } from './skeleton';
import { ToastHost } from './toast';

const LazyModalRoot = lazy(() =>
  import('@/shared/modal/modal-root').then(m => ({ default: m.ModalRoot })),
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <ModalProvider>
        <SkeletonWrapper>
          <ToastHost />
          {children}
        </SkeletonWrapper>
        <Suspense fallback={null}>
          <LazyModalRoot />
        </Suspense>
      </ModalProvider>
    </ReactQueryProvider>
  );
}
