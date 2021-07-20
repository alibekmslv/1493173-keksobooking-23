import { setInitialAddress } from './map.js';
import { postOffer } from './api.js';
import { showErrorModal, showSuccessModal } from './modal.js';

const addForm = document.querySelector('.ad-form');
const addFormInteractiveElements = addForm.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilterInteractiveElements = [...mapFilter.querySelectorAll('select'), ...mapFilter.querySelectorAll('fieldset')];

const offerFormToActiveState = () => {
  addForm.classList.remove('ad-form--disabled');
  addFormInteractiveElements.forEach((item) => {
    item.disabled = false;
  });
};

const switchFormsToDisabledState = () => {
  addForm.classList.add('ad-form--disabled');
  addFormInteractiveElements.forEach((item) => {
    item.disabled = true;
  });

  mapFilter.classList.add('map__filters--disabled');
  mapFilterInteractiveElements.forEach((item) => {
    item.disabled = true;
  });
};

const switchFormsToActiveState = () => {
  offerFormToActiveState();

  mapFilter.classList.remove('map__filters--disabled');
  mapFilterInteractiveElements.forEach((item) => {
    item.disabled = false;
  });
};

const resetOfferForm = () => {
  addForm.reset();
};

const offerSubmitHandler = (evt) => {
  evt.preventDefault();

  postOffer(
    () => {
      showSuccessModal();
      resetOfferForm();
    },
    (error) => {
      showErrorModal(error);
    },
    new FormData(evt.target));
};

const offerResetHandler = () => {
  setTimeout(() => {
    setInitialAddress();
  }, 0);
};

addForm.addEventListener('submit', offerSubmitHandler);
addForm.addEventListener('reset', offerResetHandler);

export { offerFormToActiveState, switchFormsToDisabledState, switchFormsToActiveState };
