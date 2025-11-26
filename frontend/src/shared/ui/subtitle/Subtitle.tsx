import styles from './Subtitle.module.css';

type TagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

interface SubtitleProp extends React.HTMLAttributes<HTMLElement> {
  as?: TagType;
  children: React.ReactNode;
}

export function Subtitle({ children, as: As = 'p', ...props }: SubtitleProp) {
  const { className, ...rest } = props;

  return (
    <As className={`${styles.subtitleWrapper} ${className}`} {...rest}>
      {children}
    </As>
  );
}
