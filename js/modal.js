import { isEscEvent } from './utils.js';
import { closeSuccessModal, closeErrorModal } from './modal-control.js';

const errorModalFragment = document.querySelector('#error').content;
const errorModalTemplate = errorModalFragment.querySelector('.error');
const successModalFragment = document.querySelector('#success').content;
const successModalTemplate = successModalFragment.querySelector('.success');
const clonedSuccessModal = successModalTemplate.cloneNode(true);
const clonedErrorModal = errorModalTemplate.cloneNode(true);

const successModalKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    closeSuccessModal();
  }
};

const successModalClickHandler = (evt) => {
  if (evt.target.matches('.success')) {
    closeSuccessModal();
  }
};

const showSuccessModal = (message) => {
  const successMessageElement = clonedSuccessModal.querySelector('.success__message');
  if (message) {
    successMessageElement.textContent = message;
  }
  document.body.appendChild(clonedSuccessModal);

  document.addEventListener('keydown', successModalKeydownHandler);
  clonedSuccessModal.addEventListener('click', successModalClickHandler);
};

const errorModalKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    closeErrorModal();
  }
};

const errorModalClickHandler = (evt) => {
  if (evt.target.matches('.error')) {
    closeErrorModal();
  }
};

const errorButtonClickHandler = () => {
  closeErrorModal();
};

const showErrorModal = (message, buttonText) => {
  const errorMessageElement = clonedErrorModal.querySelector('.error__message');
  const errorButton = clonedErrorModal.querySelector('.error__button');

  if (message) {
    errorMessageElement.textContent = message;
  }

  if (buttonText) {
    errorButton.textContent = buttonText;
  }

  document.addEventListener('keydown', errorModalKeydownHandler);
  clonedErrorModal.addEventListener('click', errorModalClickHandler);
  errorButton.addEventListener('click', errorButtonClickHandler);

  document.body.appendChild(clonedErrorModal);
};

export {
  showErrorModal,
  showSuccessModal,
  clonedErrorModal,
  clonedSuccessModal,
  successModalKeydownHandler,
  errorModalKeydownHandler
};
