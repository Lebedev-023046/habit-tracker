import { useEffect, useRef } from 'react';

export function useClickOutside<T extends HTMLElement>(
  callback: (event: MouseEvent | TouchEvent) => void,
) {
  const ref = useRef<T | null>(null);

  // console.log({ ref });

  const handleMouseDown = (event: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (el.contains(event.target as Node)) return;

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

  return ref;
}
