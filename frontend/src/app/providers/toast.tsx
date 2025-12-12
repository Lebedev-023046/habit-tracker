import { Suspense, lazy } from 'react';

const LazyToaster = lazy(async () => {
  const mod = await import('sonner');
  return { default: mod.Toaster };
});

export function ToastHost() {
  return (
    <Suspense fallback={null}>
      <LazyToaster richColors position="top-right" />
    </Suspense>
  );
}
