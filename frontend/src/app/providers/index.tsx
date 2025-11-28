import { ModalRoot } from '@/shared/modal/modal-root';

import { ModalProvider } from '@/shared/modal/modal-context';
import { ReactQueryProvider } from './react-query';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <ModalProvider>
        {children}
        <ModalRoot />
      </ModalProvider>
    </ReactQueryProvider>
  );
}
