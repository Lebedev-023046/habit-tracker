// shared/ui/animation/MotionCollapse.tsx
import { AnimatePresence, motion } from 'motion/react';
import { collapseVariants, transitions } from './presets';

interface CollapseMotionProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export default function CollapseMotion({
  isOpen,
  children,
}: CollapseMotionProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          variants={collapseVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={transitions.base}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
