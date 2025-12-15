import { VARIANT_MAP, type TypographyVariant } from './variants';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant: TypographyVariant;
  children: React.ReactNode;
}

export function Typography({ children, variant, ...props }: TypographyProps) {
  const { as: As = 'p', className: variantClass = '' } = VARIANT_MAP[variant];

  const { className, ...restProps } = props;

  return (
    <As className={`${variantClass} ${className ?? ''}`} {...restProps}>
      {children}
    </As>
  );
}
