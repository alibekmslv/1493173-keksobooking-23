const cardFragment = document.querySelector('#card').content;
const cardTemplate = cardFragment.querySelector('.popup');
const typeMap = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};
const featuresOrderMap = {
  wifi: 1,
  dishwasher: 2,
  parking: 3,
  washer: 4,
  elevator: 5,
  conditioner: 6,
};

const compareFeatures = (featureA, featureB) => {
  const rankA = featuresOrderMap[featureA];
  const rankB = featuresOrderMap[featureB];

  return rankA - rankB;
};

const createCard = ({author: {avatar}, offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}}) => {
  const clonedCard = cardTemplate.cloneNode(true);
  const avatarElement = clonedCard.querySelector('.popup__avatar');
  const titleElement = clonedCard.querySelector('.popup__title');
  const addressElement = clonedCard.querySelector('.popup__text--address');
  const priceElement = clonedCard.querySelector('.popup__text--price');
  const typeElement = clonedCard.querySelector('.popup__type');
  const capacityElement = clonedCard.querySelector('.popup__text--capacity');
  const timeElement = clonedCard.querySelector('.popup__text--time');
  const featuresElement = clonedCard.querySelector('.popup__features');
  const descriptionElement = clonedCard.querySelector('.popup__description');
  const photosElement = clonedCard.querySelector('.popup__photos');

  if (avatar) {
    avatarElement.src = avatar;
  } else {
    avatarElement.remove();
  }

  if (title) {
    titleElement.textContent = title;
  } else {
    titleElement.remove();
  }

  if (address) {
    addressElement.textContent = address;
  } else {
    addressElement.remove();
  }

  if (price) {
    priceElement.textContent = `${price} + ₽/ночь`;
  } else {
    priceElement.remove();
  }

  if (type) {
    typeElement.textContent = typeMap[type];
  } else {
    typeElement.remove();
  }

  if (rooms && guests) {
    capacityElement.textContent = `${rooms} комнаты для ${guests} гостей`;
  } else {
    capacityElement.remove();
  }

  if (checkin && checkout) {
    timeElement.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    capacityElement.remove();
  }

  if (features && features.length) {
    const featuresListFragment = document.createDocumentFragment();
    const featureItemElement = featuresElement.querySelector('.popup__feature');

    features.slice().sort(compareFeatures).forEach((feature) => {
      const clonedFeatureItem = featureItemElement.cloneNode(true);
      clonedFeatureItem.classList.remove('popup__feature--wifi');
      clonedFeatureItem.classList.add(`popup__feature--${feature}`);
      featuresListFragment.appendChild(clonedFeatureItem);
    });

    featuresElement.innerHTML = '';
    featuresElement.appendChild(featuresListFragment);
  } else {
    featuresElement.remove();
  }

  if (description) {
    descriptionElement.textContent = description;
  } else {
    descriptionElement.remove();
  }

  if (photos && photos.length) {
    const photosListFragment = document.createDocumentFragment();
    const photoElement = photosElement.querySelector('.popup__photo');

    photos.forEach((photo) => {
      const clonedPhoto = photoElement.cloneNode(false);
      clonedPhoto.src = photo;
      photosListFragment.appendChild(clonedPhoto);
    });

    photoElement.remove();
    photosElement.appendChild(photosListFragment);
  } else {
    photosElement.remove();
  }

  return clonedCard;
};

export { createCard };
