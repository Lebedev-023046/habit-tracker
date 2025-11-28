// src/shared/modal/ModalRoot.tsx

import { BaseModal } from '../base-modal';
import { useModal } from '../modal-context/ModalContext';

export const ModalRoot = () => {
  const { modals, closeModal } = useModal();

  if (modals.length === 0) return null;

  return (
    <>
      {modals.map(({ id, Component, props }) => (
        <BaseModal key={id} onClose={() => closeModal(id)}>
          <Component {...props} close={() => closeModal(id)} />
        </BaseModal>
      ))}
    </>
  );
};
