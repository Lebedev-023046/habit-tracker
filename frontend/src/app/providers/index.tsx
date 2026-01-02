import { ModalProvider } from '@/shared/modal/modal-context';

import { lazy, Suspense, type PropsWithChildren } from 'react';
import { AuthProvider } from './auth';
import { ReactQueryProvider } from './react-query';
import { SkeletonWrapper } from './skeleton';
import { ToastHost } from './toast';

const LazyModalRoot = lazy(() =>
  import('@/shared/modal/modal-root').then(m => ({ default: m.ModalRoot })),
);

export function Providers({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
