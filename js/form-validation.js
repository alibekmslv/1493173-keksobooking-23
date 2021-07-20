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
const offerTypeMap = {
  bungalow: BUNGALOW_MIN_PRICE,
  flat: FLAT_MIN_PRICE,
  hotel: HOTEL_MIN_PRICE,
  house: HOUSE_MIN_PRICE,
  palace: PALACE_MIN_PRICE,
};

offerTitleInput.addEventListener('input', () => {
  const valueLength = offerTitleInput.value.length;
  const { tooShort, tooLong } = offerTitleInput.validity;

  if (tooShort) {
    offerTitleInput.setCustomValidity(`Еще ${offerTitleInput.getAttribute('minlength') - valueLength} симв.`);
  } else if (tooLong) {
    offerTitleInput.setCustomValidity(`Удалите лишние ${valueLength - offerTitleInput.getAttribute('maxlength')} симв.`);
  } else {
    offerTitleInput.setCustomValidity('');
  }

  offerTitleInput.reportValidity();
});

offerPriceInput.addEventListener('input', () => {
  const minValue = offerPriceInput.getAttribute('min');
  const maxValue = offerPriceInput.getAttribute('max');
  const { rangeOverflow, rangeUnderflow } = offerPriceInput.validity;
  const offerTypeText = offerTypeSelect.options[offerTypeSelect.selectedIndex].text;

  if (rangeUnderflow) {
    offerPriceInput.setCustomValidity(`"${offerTypeText}" – минимальная цена за ночь ${minValue}`);
  } else if (rangeOverflow) {
    offerPriceInput.setCustomValidity(`Цена не должна превышать ${maxValue}`);
  } else {
    offerPriceInput.setCustomValidity('');
  }

  offerPriceInput.reportValidity();
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
  } else if (roomsValue < MAX_ROOMS_VALUE && capacityValue === 0) {
    offerCapacitySelect.setCustomValidity(`${roomsValue} комн. для гостей`);
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


const setAttributesOfferType = () => {
  offerPriceInput.setAttribute('min', offerTypeMap[offerTypeSelect.value]);
  offerPriceInput.setAttribute('placeholder', offerTypeMap[offerTypeSelect.value]);
};
setAttributesOfferType();

offerTypeSelect.addEventListener('change', () => {
  setAttributesOfferType();
});

offerCheckinSelect.addEventListener('change', () => {
  offerCheckoutSelect.selectedIndex = offerCheckinSelect.options.selectedIndex;
});

offerCheckoutSelect.addEventListener('change', () => {
  offerCheckinSelect.selectedIndex = offerCheckoutSelect.options.selectedIndex;
});
