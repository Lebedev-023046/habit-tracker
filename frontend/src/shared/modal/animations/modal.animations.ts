// src/shared/modal/animations/modal.animations.ts
import type { Transition, Variants } from 'motion/react';

export const backdropVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const modalVariants: Variants = {
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

export const modalTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 25,
};
