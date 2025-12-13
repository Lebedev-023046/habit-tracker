import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';

import { toast } from '@/shared/lib/toast';
import type {
  LazyModalFactory,
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
    props?: ModalExternalProps<P>,
  ) => string;

  openLazyModal: <P extends ModalBaseProps>(
    factory: LazyModalFactory<P>,
    props?: ModalExternalProps<P>,
  ) => string;
  closeModal: (id: string) => void;
  closeAll: () => void;
}

interface ModalProviderProps {
  children: ReactNode;
}

const ModalContext = createContext<ModalContextValue | null>(null);

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

function resolveLazyModule<P extends ModalBaseProps>(
  mod: any,
): ModalComponent<P> {
  if (typeof mod === 'function') return mod as ModalComponent<P>;
  if (mod?.default) return mod.default as ModalComponent<P>;
  if (mod?.Modal) return mod.Modal as ModalComponent<P>;
  throw new Error('Lazy modal factory did not return a component');
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modals, setModals] = useState<ModalState[]>([]);

  function openModal<P extends ModalBaseProps>(
    Component: ModalComponent<P>,
    props: ModalExternalProps<P> = {} as ModalExternalProps<P>,
  ) {
    const id = createId();
    setModals(prev => [...prev, { id, Component, props: props || {} }]);
    return id;
  }

  const openLazyModal = useCallback(
    <P extends ModalBaseProps>(
      factory: LazyModalFactory<P>,
      props: ModalExternalProps<P> = {} as ModalExternalProps<P>,
    ) => {
      const id = createId();

      void factory()
        .then(mod => {
          const Component = resolveLazyModule<P>(mod);

          setModals(prev => [...prev, { id, Component, props: props || {} }]);
        })
        .catch(err => {
          console.error('Failed to load modal', err);
          toast.error('Failed to load modal');
          setModals(prev => prev.filter(m => m.id !== id));
        });

      return id;
    },
    [],
  );

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
        openLazyModal,
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
