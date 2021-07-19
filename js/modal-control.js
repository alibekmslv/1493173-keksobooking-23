import { clonedSuccessModal, onKeydownSuccessModal } from './modal.js';

const closeSuccessModal = () => {
  document.removeEventListener('keydown', onKeydownSuccessModal);

  clonedSuccessModal.remove();
};

export { closeSuccessModal };
