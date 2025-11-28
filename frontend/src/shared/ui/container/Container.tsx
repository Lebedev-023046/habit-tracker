import styles from './Container.module.css';

// tag type for as prop
type TagType = 'section' | 'div' | 'article' | 'header' | 'footer';

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: TagType;
  children: React.ReactNode;
}

export function Container({
  as: As = 'section',
  children,
  ...props
}: SectionProps) {
  // извлекаем класс из props
  const { className, ...rest } = props;

  return (
    <As className={`${styles.container} ${className}`} {...rest}>
      {children}
    </As>
  );
}
