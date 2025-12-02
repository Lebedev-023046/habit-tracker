import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'plain' | 'neutral' | 'outlined' | 'icon';
  animation?: 'light-sweep' | 'none';
  borderRadius?: string;
}

const variantClassMap = {
  primary: styles.primary,
  outlined: styles.outlined,
  ghost: styles.ghost,
  plain: styles.plain,
  neutral: styles.neutral,
  icon: styles.icon,
};

const animationClassMap = {
  'light-sweep': styles.lightSweep,
  none: '',
};

export function Button({
  children,
  variant = 'primary',
  animation = 'light-sweep',
  borderRadius,
  ...props
}: ButtonProps) {
  const { className, ...rest } = props;

  const variantClass = variantClassMap[variant];
  const animationClass = animationClassMap[animation];

  return (
    <button
      className={`${styles.button} ${variantClass} ${animationClass} ${className}`}
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
