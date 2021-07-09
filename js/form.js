const addForm = document.querySelector('.ad-form');
const addFormInteractiveElements = addForm.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilterInteractiveElements = [...mapFilter.querySelectorAll('select'), ...mapFilter.querySelectorAll('fieldset')];

const switchFormToDisabledState = () => {
  addForm.classList.add('ad-form--disabled');
  addFormInteractiveElements.forEach((item) => {
    item.disabled = true;
  });

  mapFilter.classList.add('map__filters--disabled');
  mapFilterInteractiveElements.forEach((item) => {
    item.disabled = true;
  });
};

const switchFormToActiveState = () => {
  addForm.classList.remove('ad-form--disabled');
  addFormInteractiveElements.forEach((item) => {
    item.disabled = false;
  });

  mapFilter.classList.remove('map__filters--disabled');
  mapFilterInteractiveElements.forEach((item) => {
    item.disabled = false;
  });
};

export {switchFormToDisabledState, switchFormToActiveState};
