import { forwardRef } from 'react';
import styles from './Button.module.css';
import {
  animationClassMap,
  textToneClassMap,
  variantClassMap,
} from './constants';
import type { ButtonProps, StatefulVariant } from './types';
import { resolveVariantStateClass } from './utils';

function BaseButton({
  children,
  active = false,
  variant = 'primary',
  animation = 'light-sweep',
  textTone = 'default',
  borderRadius,
  ...props
}: ButtonProps) {
  const { className, ...rest } = props;

  const variantClass = variantClassMap[variant];
  const textToneClass = textToneClassMap[textTone];
  const animationClass = animationClassMap[animation];

  const stateClass = resolveVariantStateClass({
    variant: variant as StatefulVariant,
    active,
  });

  return (
    <button
      className={[
        styles.button,
        variantClass,
        textToneClass,
        animationClass,
        stateClass,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={
        {
          '--border-radius': borderRadius,
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </button>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <BaseButton {...props} ref={ref} />,
);

Button.displayName = 'Button';
