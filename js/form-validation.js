const CAPACITY_VALIDITY_DEFAULT_TEXT = 'Количество гостей должно быть меньше или равно количеству комнат';
const MAX_ROOMS_VALUE = 100;
const BUNGALOW_MIN_PRICE = 0;
const FLAT_MIN_PRICE = 1000;
const HOTEL_MIN_PRICE = 3000;
const HOUSE_MIN_PRICE = 5000;
const PALACE_MIN_PRICE = 10000;

const offerForm = document.querySelector('.ad-form');
const titleInputElement = offerForm.querySelector('#title');
const priceInputElement = offerForm.querySelector('#price');
const roomQuantitySelectElement = offerForm.querySelector('#room_number');
const roomCapacitySelectElement = offerForm.querySelector('#capacity');
const typeSelectElement = offerForm.querySelector('#type');
const checkinSelectElement = offerForm.querySelector('#timein');
const checkoutSelectElement = offerForm.querySelector('#timeout');
const offerTypeMap = {
  bungalow: BUNGALOW_MIN_PRICE,
  flat: FLAT_MIN_PRICE,
  hotel: HOTEL_MIN_PRICE,
  house: HOUSE_MIN_PRICE,
  palace: PALACE_MIN_PRICE,
};

titleInputElement.addEventListener('input', () => {
  const valueLength = titleInputElement.value.length;
  const { tooShort, tooLong, valueMissing } = titleInputElement.validity;

  if (tooShort) {
    titleInputElement.setCustomValidity(`Еще ${titleInputElement.getAttribute('minlength') - valueLength} симв.`);
  } else if (tooLong) {
    titleInputElement.setCustomValidity(`Удалите лишние ${valueLength - titleInputElement.getAttribute('maxlength')} симв.`);
  } else if (valueMissing) {
    titleInputElement.setCustomValidity('Обязательное поле');
  } else {
    titleInputElement.setCustomValidity('');
  }

  titleInputElement.reportValidity();
});

priceInputElement.addEventListener('input', () => {
  const minValue = priceInputElement.getAttribute('min');
  const maxValue = priceInputElement.getAttribute('max');
  const { rangeOverflow, rangeUnderflow, valueMissing } = priceInputElement.validity;
  const offerTypeText = typeSelectElement.options[typeSelectElement.selectedIndex].text;

  if (rangeUnderflow) {
    priceInputElement.setCustomValidity(`"${offerTypeText}" – минимальная цена за ночь ${minValue}`);
  } else if (rangeOverflow) {
    priceInputElement.setCustomValidity(`Цена не должна превышать ${maxValue}`);
  } else if (valueMissing) {
    priceInputElement.setCustomValidity('Обязательное поле');
  } else {
    priceInputElement.setCustomValidity('');
  }

  priceInputElement.reportValidity();
});

if (roomQuantitySelectElement.value < roomCapacitySelectElement.value) {
  roomCapacitySelectElement.setCustomValidity(CAPACITY_VALIDITY_DEFAULT_TEXT);
} else {
  roomCapacitySelectElement.setCustomValidity('');
}

const checkRoomsCapacity = () => {
  const roomsValue = parseFloat(roomQuantitySelectElement.value);
  const capacityValue = parseFloat(roomCapacitySelectElement.value);

  if (roomsValue >= MAX_ROOMS_VALUE && capacityValue !== 0) {
    roomCapacitySelectElement.setCustomValidity(`${MAX_ROOMS_VALUE} комнат – не для гостей`);
  } else if (roomsValue < MAX_ROOMS_VALUE && capacityValue === 0) {
    roomCapacitySelectElement.setCustomValidity(`${roomsValue} комн. для гостей`);
  } else if (roomsValue >= capacityValue) {
    roomCapacitySelectElement.setCustomValidity('');
  } else {
    roomCapacitySelectElement.setCustomValidity(CAPACITY_VALIDITY_DEFAULT_TEXT);
  }

  roomCapacitySelectElement.reportValidity();
};

roomQuantitySelectElement.addEventListener('change', () => {
  checkRoomsCapacity();
});

roomCapacitySelectElement.addEventListener('change', () => {
  checkRoomsCapacity();
});


const setAttributesOfferType = () => {
  priceInputElement.setAttribute('min', offerTypeMap[typeSelectElement.value]);
  priceInputElement.setAttribute('placeholder', offerTypeMap[typeSelectElement.value]);
};
setAttributesOfferType();

typeSelectElement.addEventListener('change', () => {
  setAttributesOfferType();
});

checkinSelectElement.addEventListener('change', () => {
  checkoutSelectElement.selectedIndex = checkinSelectElement.options.selectedIndex;
});

checkoutSelectElement.addEventListener('change', () => {
  checkinSelectElement.selectedIndex = checkoutSelectElement.options.selectedIndex;
});
