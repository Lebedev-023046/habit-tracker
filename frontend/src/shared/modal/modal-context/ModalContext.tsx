import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';

import type {
  ModalBaseProps,
  ModalComponent,
  ModalExternalProps,
} from '../types';

type Props = Record<string, unknown>;

interface ModalState {
  id: string;
  Component: React.ComponentType<any>;
  props: Props;
}

interface ModalContextValue {
  modals: ModalState[];
  openModal: <P extends ModalBaseProps>(
    Component: ModalComponent<P>,
    props: ModalExternalProps<P>,
  ) => string;
  closeModal: (id: string) => void;
  closeAll: () => void;
}

interface ModalProviderProps {
  children: ReactNode;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modals, setModals] = useState<ModalState[]>([]);

  function openModal<P extends ModalBaseProps>(
    Component: ModalComponent<P>,
    props: ModalExternalProps<P> = {} as ModalExternalProps<P>,
  ) {
    const id = `${Date.now()}-${Math.random()}`;
    setModals(prev => [...prev, { id, Component, props: props || {} }]);
    return id;
  }

  const closeModal = useCallback((id: string) => {
    setModals(prev => prev.filter(m => m.id !== id));
  }, []);

  const closeAll = useCallback(() => {
    setModals([]);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        modals,
        openModal,
        closeModal,
        closeAll,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextValue => {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return ctx;
};
