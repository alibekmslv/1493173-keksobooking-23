import { clonedSuccessModal, successModalKeydownHandler, clonedErrorModal, errorModalKeydownHandler } from './modal.js';

const closeSuccessModal = () => {
  document.removeEventListener('keydown', successModalKeydownHandler);

  clonedSuccessModal.remove();
};

const closeErrorModal = () => {
  document.removeEventListener('keydown', errorModalKeydownHandler);

  clonedErrorModal.remove();
};

export { closeSuccessModal, closeErrorModal };
