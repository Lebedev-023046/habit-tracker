import { ModalRoot } from '@/shared/modal/modal-root';

import { ModalProvider } from '@/shared/modal/modal-context';
import { ReactQueryProvider } from './react-query';
import { SkeletonWrapper } from './skeleton';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <ModalProvider>
        <SkeletonWrapper>{children}</SkeletonWrapper>
        <ModalRoot />
      </ModalProvider>
    </ReactQueryProvider>
  );
}
