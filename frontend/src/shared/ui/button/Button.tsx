import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'basic' | 'icon';
}

const variantClassMap = {
  primary: styles.primary,
  ghost: styles.ghost,
  basic: styles.basic,
  icon: styles.icon,
};

export function Button({
  children,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const { className, ...rest } = props;

  const variantClass = variantClassMap[variant];

  return (
    <button
      className={`${styles.buttonWrapper} ${variantClass} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
