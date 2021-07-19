import { isEscEvent } from './utils.js';
import { closeSuccessModal } from './modal-control.js';

const errorModalFragment = document.querySelector('#error').content;
const errorModalTemplate = errorModalFragment.querySelector('.error');
const successModalFragment = document.querySelector('#success').content;
const successModalTemplate = successModalFragment.querySelector('.success');
const clonedSuccessModal = successModalTemplate.cloneNode(true);

const onKeydownSuccessModal = (evt) => {
  if (isEscEvent(evt)) {
    closeSuccessModal();
  }
};

const onClickSuccessModal = (evt) => {
  if (evt.target.matches('.success')) {
    closeSuccessModal();
  }
};

const showSuccessModal = () => {
  document.body.appendChild(clonedSuccessModal);

  document.addEventListener('keydown', onKeydownSuccessModal);
  clonedSuccessModal.addEventListener('click', onClickSuccessModal);
};

const showErrorModal = (message, buttonText = 'Попровать снова') => {
  const clonedErrorModal = errorModalTemplate.cloneNode(true);
  const errorMessageElement = clonedErrorModal.querySelector('.error__message');
  const errorControlButton = clonedErrorModal.querySelector('.error__button');

  errorMessageElement.textContent = message;
  errorControlButton.textContent = buttonText;

  errorControlButton.addEventListener('click', () => {
    clonedErrorModal.remove();
  });

  document.body.appendChild(clonedErrorModal);
};

export { showErrorModal, showSuccessModal, clonedSuccessModal, onKeydownSuccessModal };
