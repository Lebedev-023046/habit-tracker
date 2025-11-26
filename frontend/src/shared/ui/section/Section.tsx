import styles from './Section.module.css';

// tag type for as prop
type TagType = 'section' | 'div' | 'article' | 'header' | 'footer';

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: TagType;
  children: React.ReactNode;
}

export function Section({
  as: As = 'section',
  children,
  ...props
}: SectionProps) {
  // извлекаем класс из props
  const { className, ...rest } = props;

  return (
    <As className={`${styles.sectionWrapper} ${className}`} {...rest}>
      {children}
    </As>
  );
}
