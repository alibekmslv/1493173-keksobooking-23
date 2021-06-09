function getRandomInt(min, max) {
  if (min < 0 || max < 0) {
    return null;
  }

  if (min === max) {
    return min;
  }

  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getRandomFloatingPoint(min, max, digits) {
  if (min < 0 || max < 0) {
    return null;
  }

  if (min === max) {
    return min;
  }

  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }

  if (digits < 0 || digits === undefined) {
    digits = 0;
  }

  const randomInteger = (Math.random() * (max - min)) + min;

  return randomInteger.toFixed(digits);
}

getRandomInt();
getRandomFloatingPoint();

const GENERATED_OFFERS_COUNT = 10;
const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN_OPTIONS = ['12:00', '13:00', '14:00'];
const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const PHOTO_COUNTER = {
  leadingInt: 0,
  countedInt: 0,
}

const getPhotoNumber = () => {
  PHOTO_COUNTER.countedInt++;

  if (PHOTO_COUNTER.countedInt >= 9) {
    PHOTO_COUNTER.leadingInt++;
    PHOTO_COUNTER.countedInt = 0;
  }

  return `${PHOTO_COUNTER.leadingInt}${PHOTO_COUNTER.countedInt}`;
}

const getRandomArrayElement = (elements) => {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

const getRandomArrayShuffledElements = (elements) => {
  const result = [];
  const maxIterations = elements.length * 3;
  const randomIterationsNumber = getRandomPositiveInteger(1, maxIterations);

  for (let i = 0; i < randomIterationsNumber; i++) {
    const arrayLengthRandomInteger = getRandomPositiveInteger(0, elements.length - 1);
    if (!result.includes(elements[arrayLengthRandomInteger])) {
      result.push(elements[arrayLengthRandomInteger]);
    }
  }

  return result;
}

const generateOffer = () => {
  const offerRandomLat = getRandomPositiveFloat(35.65000, 35.70000, 5);
  const offerRandomLng = getRandomPositiveFloat(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: `img/avatars/user${getPhotoNumber()}.png`,
    },
    offer: {
      title: 'Квартира в Токио',
      address: `${offerRandomLat}, ${offerRandomLng}`,
      price: getRandomPositiveInteger(1, 50000),
      type: getRandomArrayElement(OFFER_TYPES),
      rooms: getRandomPositiveInteger(1, 30),
      guests: getRandomPositiveInteger(1, 60),
      checkin: getRandomArrayElement(CHECKIN_OPTIONS),
      checkout: getRandomArrayElement(CHECKIN_OPTIONS),
      features: getRandomArrayShuffledElements(OFFER_FEATURES, 21),
      description: 'Уютная квартира в Токио',
      photos: getRandomArrayShuffledElements(OFFER_PHOTOS, 6),
    },
    location: {
      lat: offerRandomLat,
      lng: offerRandomLng,
    }
  }
}

const generatedOffers = new Array(GENERATED_OFFERS_COUNT).fill(null).map(() => {
  return generateOffer();
})
