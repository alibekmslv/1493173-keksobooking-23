import { setInitialAddress, setMapInitialView } from './map.js';
import { postOffer } from './api.js';
import { showErrorModal, showSuccessModal } from './modal.js';

const offerForm = document.querySelector('.ad-form');
const offerFormInteractiveElements = offerForm.querySelectorAll('fieldset');
const filterForm = document.querySelector('.map__filters');
const filterFormInteractiveElements = [...filterForm.querySelectorAll('select'), ...filterForm.querySelectorAll('fieldset')];

const offerFormToActiveState = () => {
  offerForm.classList.remove('ad-form--disabled');
  offerFormInteractiveElements.forEach((item) => {
    item.disabled = false;
  });
};

const pageFormsToDisabledState = () => {
  offerForm.classList.add('ad-form--disabled');
  offerFormInteractiveElements.forEach((item) => {
    item.disabled = true;
  });

  filterForm.classList.add('map__filters--disabled');
  filterFormInteractiveElements.forEach((item) => {
    item.disabled = true;
  });
};

const pageFormsToActiveState = () => {
  offerFormToActiveState();

  filterForm.classList.remove('map__filters--disabled');
  filterFormInteractiveElements.forEach((item) => {
    item.disabled = false;
  });
};

const resetFilterForm = () => {
  setMapInitialView();
  filterForm.reset();
};

const resetOfferForm = () => {
  offerForm.reset();
};

const offerFormSubmitHandler = (evt) => {
  evt.preventDefault();

  postOffer(
    () => {
      showSuccessModal();
      resetOfferForm();
      resetFilterForm();
    },
    (error) => {
      showErrorModal(error);
    },
    new FormData(evt.target));
};

const offerFormResetHandler = () => {
  resetFilterForm();
  setTimeout(() => {
    setInitialAddress();
  }, 0);
};

offerForm.addEventListener('submit', offerFormSubmitHandler);
offerForm.addEventListener('reset', offerFormResetHandler);

export { offerFormToActiveState, pageFormsToDisabledState, pageFormsToActiveState };
