// shared/ui/animation/presets/transitions.ts
import type { Transition } from 'motion/react';

export const transitions = {
  instant: {
    duration: 0,
  },

  fast: {
    duration: 0.15,
    ease: 'easeOut',
  },

  base: {
    duration: 0.25,
    ease: 'easeOut',
  },

  slow: {
    duration: 0.35,
    ease: 'easeOut',
  },
} satisfies Record<string, Transition>;
