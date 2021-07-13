const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const MAX_PRICE_VALUE = 1000000;
const CAPACITY_VALIDITY_DEFAULT_TEXT = 'Количество гостей должно быть меньше или равно количеству комнат';
const MAX_ROOMS_VALUE = 100;
const BUNGALOW_MIN_PRICE = 0;
const FLAT_MIN_PRICE = 1000;
const HOTEL_MIN_PRICE = 3000;
const HOUSE_MIN_PRICE = 5000;
const PALACE_MIN_PRICE = 10000;

const addForm = document.querySelector('.ad-form');
const offerTitleInput = addForm.querySelector('#title');
const offerPriceInput = addForm.querySelector('#price');
const offerRoomsQuantitySelect = addForm.querySelector('#room_number');
const offerCapacitySelect = addForm.querySelector('#capacity');
const offerTypeSelect = addForm.querySelector('#type');
const offerCheckinSelect = addForm.querySelector('#timein');
const offerCheckoutSelect = addForm.querySelector('#timeout');

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

const checkRoomsCapacity = () => {
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

offerRoomsQuantitySelect.addEventListener('change', () => {
  checkRoomsCapacity();
});

offerCapacitySelect.addEventListener('change', () => {
  checkRoomsCapacity();
});


const checkOfferType = () => {
  switch (offerTypeSelect.value) {
    case 'bungalow':
      offerPriceInput.setAttribute('min', BUNGALOW_MIN_PRICE);
      break;
    case 'flat':
      offerPriceInput.setAttribute('min', FLAT_MIN_PRICE);
      break;
    case 'hotel':
      offerPriceInput.setAttribute('min', HOTEL_MIN_PRICE);
      break;
    case 'house':
      offerPriceInput.setAttribute('min', HOUSE_MIN_PRICE);
      break;
    case 'palace':
      offerPriceInput.setAttribute('min', PALACE_MIN_PRICE);
      break;
    default:
      break;
  }
};
checkOfferType();

offerTypeSelect.addEventListener('change', () => {
  checkOfferType();
});

offerCheckinSelect.addEventListener('change', () => {
  offerCheckoutSelect.selectedIndex = offerCheckinSelect.options.selectedIndex;
});

offerCheckoutSelect.addEventListener('change', () => {
  offerCheckinSelect.selectedIndex = offerCheckoutSelect.options.selectedIndex;
});
