import type { stateClassMap } from './constants';

export type ButtonVariant =
  | 'primary'
  | 'ghost'
  | 'plain'
  | 'neutral'
  | 'danger'
  | 'outlined'
  | 'icon'
  | 'chip';

export type TextTone =
  | 'default'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'danger'
  | 'positive'
  | 'neutral';

export type StatefulVariant = keyof typeof stateClassMap;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  active?: boolean;
  variant?: ButtonVariant;
  textTone?: TextTone;
  animation?: 'light-sweep' | 'none';
  borderRadius?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

export interface ResolveStateMap {
  variant: StatefulVariant;
  active?: boolean;
}
