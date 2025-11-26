import type { IconType } from 'react-icons';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: 'primary' | 'ghost';
  startIcon?: IconType;
  endIcon?: IconType;
}

const variantClassMap = {
  primary: styles.primary,
  ghost: styles.ghost,
};

export function Button({ children, variant, ...props }: ButtonProps) {
  const { className, ...rest } = props;

  const { startIcon: StartIcon, endIcon: EndIcon } = props;

  const variantClass = variantClassMap[variant];

  return (
    <button
      className={`${styles.buttonWrapper} ${variantClass} ${className}`}
      {...rest}
    >
      {StartIcon && <StartIcon />}
      {children}
      {EndIcon && <EndIcon />}
    </button>
  );
}
