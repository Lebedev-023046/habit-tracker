import type { PropsWithChildren } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';

export function SkeletonWrapper({ children }: PropsWithChildren) {
  return (
    <SkeletonTheme borderRadius={'var(--rounded-sm)'}>{children}</SkeletonTheme>
  );
}
