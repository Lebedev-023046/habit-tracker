import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { GlobalFallback } from './global-fallback';

export function RouterErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    const message =
      (typeof error.data === 'string' && error.data) ||
      (error.data && (error.data.message as string)) ||
      error.statusText ||
      `Request failed with status ${error.status}`;

    return <GlobalFallback error={new Error(message)} />;
  }

  const unknownError =
    error instanceof Error ? error : new Error('Unknown routing error');

  return <GlobalFallback error={unknownError} />;
}
