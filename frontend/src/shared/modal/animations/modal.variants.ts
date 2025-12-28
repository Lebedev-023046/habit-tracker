import { fadeVariants } from '@/shared/ui/animation/presets/variants';
import type { Variants } from 'motion/react';

/**
 * Backdrop — просто fade
 */
export const modalBackdropVariants: Variants = {
  ...fadeVariants,
};

/**
 * Контент модалки — fade + transform
 */
export const modalContentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: 40,
    scale: 0.96,
  },
};
