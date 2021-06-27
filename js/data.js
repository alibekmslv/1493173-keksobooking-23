import {getRandomInt, getRandomFloatingPoint} from './utils.js';

const GENERATED_OFFERS_COUNT = 10;
const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN_OPTIONS = ['12:00', '13:00', '14:00'];
const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const PHOTO_COUNTER = {
  leadingInt: 0,
  countedInt: 0,
};

const getPhotoNumber = () => {
  PHOTO_COUNTER.countedInt++;

  if (PHOTO_COUNTER.countedInt >= 9) {
    PHOTO_COUNTER.leadingInt++;
    PHOTO_COUNTER.countedInt = 0;
  }

  return `${PHOTO_COUNTER.leadingInt}${PHOTO_COUNTER.countedInt}`;
};

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const getRandomArrayShuffledElements = (elements) => {
  const result = [];
  const maxIterations = elements.length * 3;
  const randomIterationsNumber = getRandomInt(1, maxIterations);

  for (let iteration = 0; iteration < randomIterationsNumber; iteration++) {
    const arrayLengthRandomInteger = getRandomInt(0, elements.length - 1);
    if (!result.includes(elements[arrayLengthRandomInteger])) {
      result.push(elements[arrayLengthRandomInteger]);
    }
  }

  return result;
};

const generateOffer = () => {
  const offerRandomLat = getRandomFloatingPoint(35.65000, 35.70000, 5);
  const offerRandomLng = getRandomFloatingPoint(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: `img/avatars/user${getPhotoNumber()}.png`,
    },
    offer: {
      title: 'Квартира в Токио',
      address: `${offerRandomLat}, ${offerRandomLng}`,
      price: getRandomInt(1, 50000),
      type: getRandomArrayElement(OFFER_TYPES),
      rooms: getRandomInt(1, 30),
      guests: getRandomInt(1, 60),
      checkin: getRandomArrayElement(CHECKIN_OPTIONS),
      checkout: getRandomArrayElement(CHECKIN_OPTIONS),
      features: getRandomArrayShuffledElements(OFFER_FEATURES, 21),
      description: 'Уютная квартира в Токио',
      photos: getRandomArrayShuffledElements(OFFER_PHOTOS, 6),
    },
    location: {
      lat: offerRandomLat,
      lng: offerRandomLng,
    },
  };
};

const generatedOffers = new Array(GENERATED_OFFERS_COUNT).fill(null).map(() => generateOffer());

export {generatedOffers};
