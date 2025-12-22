import type { ReactNode } from 'react';
import { GlobalFallback } from '../error-boundary/global-fallback';
import { LoadingFallback } from '../loading';

// PageState.tsx
interface SectionStateProps {
  isLoading: boolean | undefined;
  error?: Error | null;
  loadingFallback?: ReactNode;
  errorFallback?: ReactNode;
  children: ReactNode;
}

export function SectionState({
  isLoading,
  error,
  loadingFallback,
  errorFallback,
  children,
}: SectionStateProps) {
  if (isLoading) {
    return <>{loadingFallback ?? <LoadingFallback />}</>;
  }

  if (error) {
    return <>{errorFallback ?? <GlobalFallback error={error} />}</>;
  }

  return <>{children}</>;
}
