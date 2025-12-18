import { useEffect, useRef } from 'react';

interface UseClickOutsideOptions {
  ignoreRefs?: React.RefObject<HTMLElement | null>[];
}

export function useClickOutside<T extends HTMLElement>(
  callback: (event: MouseEvent | TouchEvent) => void,
  options?: UseClickOutsideOptions,
) {
  const ref = useRef<T | null>(null);
  const ignoreRefs = options?.ignoreRefs ?? [];

  const isIgnored = (target: EventTarget | null) => {
    if (!target) return false;

    return ignoreRefs.some(ignoreRef =>
      ignoreRef.current?.contains(target as Node),
    );
  };

  const handleMouseDown = (event: MouseEvent | TouchEvent) => {
    const el = ref.current;
    const target = event.target;
    if (!el || !target) return;
    if (el.contains(event.target as Node)) return;
    if (isIgnored(target)) return;

    callback(event);
  };

  const handleTouchStart = (event: TouchEvent) => {
    const el = ref.current;
    if (!el) return;
    if (el.contains(event.target as Node)) return;

    callback(event);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('touchstart', handleTouchStart);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, [callback]);

  return { ref };
}
