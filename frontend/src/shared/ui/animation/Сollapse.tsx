import { lazy, Suspense } from 'react';

const MotionCollapse = lazy(() => import('./Collapse.motion'));

interface CollapseProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const ENABLE_ANIMATIONS = true;

export function Collapse(props: CollapseProps) {
  if (!ENABLE_ANIMATIONS) {
    return props.isOpen ? <>{props.children}</> : null;
  }

  return (
    <Suspense fallback={props.isOpen ? <div>{props.children}</div> : null}>
      <MotionCollapse {...props} />
    </Suspense>
  );
}
