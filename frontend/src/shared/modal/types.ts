import type { ComponentType } from 'react';

export interface ModalBaseProps {
  close: () => void;
}

export type ModalExternalProps<P extends ModalBaseProps> = Omit<
  P,
  keyof ModalBaseProps
>;

export type ModalComponent<P extends ModalBaseProps> = ComponentType<P>;

export type LazyModalFactory<P extends ModalBaseProps> = () => Promise<
  | {
      default?: ModalComponent<P>;
      Modal?: ModalComponent<P>;
    }
  | ModalComponent<P>
>;
