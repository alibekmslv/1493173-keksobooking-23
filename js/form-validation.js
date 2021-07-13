const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const MAX_PRICE_VALUE = 1000000;
const CAPACITY_VALIDITY_DEFAULT_TEXT = 'Количество гостей должно быть меньше или равно количеству комнат';
const MAX_ROOMS_VALUE = 100;

const addForm = document.querySelector('.ad-form');
const offerTitleInput = addForm.querySelector('input[name="title"]');
const offerPriceInput = addForm.querySelector('input[name="price"]');
const offerRoomsQuantitySelect = addForm.querySelector('select[name="rooms"]');
const offerCapacitySelect = addForm.querySelector('select[name="capacity"]');
const offerTypeSelect = addForm.querySelector('select[name="type"]');

offerTitleInput.addEventListener('input', () => {
  const valueLength = offerTitleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    offerTitleInput.setCustomValidity(`Еще ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    offerTitleInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else if (offerTitleInput.validity.valueMissing) {
    offerTitleInput.setCustomValidity('Обязательное поле');
  } else {
    offerTitleInput.setCustomValidity('');
  }

  offerTitleInput.reportValidity();
});

offerPriceInput.addEventListener('input', () => {
  const inputValue = parseFloat(offerPriceInput.value);
  const minValue = parseFloat(offerPriceInput.getAttribute('min'));

  if (inputValue < minValue) {
    offerPriceInput.setCustomValidity(`"${offerTypeSelect.options[offerTypeSelect.selectedIndex].text}" – минимальная цена за ночь ${minValue}`);
  } else if (inputValue > MAX_PRICE_VALUE) {
    offerPriceInput.setCustomValidity(`Цена не должна превышать ${MAX_PRICE_VALUE}`);
  } else if (offerPriceInput.validity.valueMissing) {
    offerPriceInput.setCustomValidity('Обязательное поле');
  } else {
    offerPriceInput.setCustomValidity('');
  }

  offerPriceInput.reportValidity();
});

offerPriceInput.addEventListener('invalid', () => {
  if (offerPriceInput.validity.valueMissing) {
    offerPriceInput.setCustomValidity('Обязательное поле');
  }
});


if (offerRoomsQuantitySelect.value < offerCapacitySelect.value) {
  offerCapacitySelect.setCustomValidity(CAPACITY_VALIDITY_DEFAULT_TEXT);
} else {
  offerCapacitySelect.setCustomValidity('');
}

const roomsQuantityHandler = () => {
  const roomsValue = parseFloat(offerRoomsQuantitySelect.value);
  const capacityValue = parseFloat(offerCapacitySelect.value);

  if (roomsValue >= MAX_ROOMS_VALUE && capacityValue !== 0) {
    offerCapacitySelect.setCustomValidity(`${MAX_ROOMS_VALUE} комнат – не для гостей`);
  } else if (roomsValue >= capacityValue) {
    offerCapacitySelect.setCustomValidity('');
  } else {
    offerCapacitySelect.setCustomValidity(CAPACITY_VALIDITY_DEFAULT_TEXT);
  }

  offerCapacitySelect.reportValidity();
};

offerRoomsQuantitySelect.addEventListener('change', roomsQuantityHandler);
offerCapacitySelect.addEventListener('change', roomsQuantityHandler);


const offerTypeHandler = () => {
  switch (offerTypeSelect.value) {
    case 'bungalow':
      offerPriceInput.setAttribute('min', 0);
      break;
    case 'flat':
      offerPriceInput.setAttribute('min', 1000);
      break;
    case 'hotel':
      offerPriceInput.setAttribute('min', 3000);
      break;
    case 'house':
      offerPriceInput.setAttribute('min', 5000);
      break;
    case 'palace':
      offerPriceInput.setAttribute('min', 10000);
      break;
    default:
      break;
  }
};
offerTypeHandler();

offerTypeSelect.addEventListener('change', offerTypeHandler);
