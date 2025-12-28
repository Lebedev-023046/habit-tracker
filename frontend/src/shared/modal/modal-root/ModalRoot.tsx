// src/shared/modal/ModalRoot.tsx

import { AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import { BaseModal } from '../base-modal';
import { useModal } from '../modal-context/ModalContext';

export const ModalRoot = () => {
  const { modals, closeModal } = useModal();

  useEffect(() => {
    if (modals.length === 0) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [modals.length]);

  return (
    <AnimatePresence mode="wait">
      {modals.map(({ id, Component, props }) => (
        <BaseModal key={id} onClose={() => closeModal(id)}>
          <Component {...props} close={() => closeModal(id)} />
        </BaseModal>
      ))}
    </AnimatePresence>
  );
};
