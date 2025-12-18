import styles from './Container.module.css';

// tag type for as prop
type TagType = 'section' | 'div' | 'article' | 'header' | 'footer';

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: TagType;
  unstyled?: boolean;
  children: React.ReactNode;
}

export function Container({
  as: As = 'section',
  unstyled = false,
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <As
      className={[styles.base, !unstyled && styles.card, className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </As>
  );
}
