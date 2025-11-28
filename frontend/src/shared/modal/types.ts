import type { ComponentType } from 'react';

export interface ModalBaseProps {
  close: () => void;
}

export type ModalExternalProps<TProps extends ModalBaseProps> = Omit<
  TProps,
  keyof ModalBaseProps
>;

export type ModalComponent<TProps extends ModalBaseProps> =
  ComponentType<TProps>;
