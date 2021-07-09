import { generatedOffers } from './data.js';

const cardFragment = document.querySelector('#card').content;
const cardTemplate = cardFragment.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');

const offersFragment = document.createDocumentFragment();

generatedOffers.forEach(({author: {avatar}, offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}}) => {
  const clonedCard = cardTemplate.cloneNode(true);
  const cardAvatar = clonedCard.querySelector('.popup__avatar');
  const cardTitle = clonedCard.querySelector('.popup__title');
  const cardAddress = clonedCard.querySelector('.popup__text--address');
  const cardPrice = clonedCard.querySelector('.popup__text--price');
  const cardType = clonedCard.querySelector('.popup__type');
  const cardCapacity = clonedCard.querySelector('.popup__text--capacity');
  const cardTime = clonedCard.querySelector('.popup__text--time');
  const cardFeatures = clonedCard.querySelector('.popup__features');
  const cardDescription = clonedCard.querySelector('.popup__description');
  const cardPhotos = clonedCard.querySelector('.popup__photos');

  avatar ? cardAvatar.src = avatar : cardAvatar.remove();
  title ? cardTitle.textContent = title : cardTitle.remove();
  address ? cardAddress.textContent = address : cardAddress.remove();
  price ? cardPrice.textContent = `${price} + ₽/ночь` : cardPrice.remove();

  switch (type) {
    case 'palace':
      cardType.textContent = 'Дворец';
      break;
    case 'flat':
      cardType.textContent = 'Квартира';
      break;
    case 'house':
      cardType.textContent = 'Дом';
      break;
    case 'bungalow':
      cardType.textContent = 'Бунгало';
      break;
    case 'hotel':
      cardType.textContent = 'Отель';
      break;
    default:
      cardType.remove();
      break;
  }

  rooms && guests ? cardCapacity.textContent = `${rooms} комнаты для ${guests} гостей` : cardCapacity.remove();
  checkin && checkout ? cardTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}` : cardCapacity.remove();

  if (features) {
    const modifiers = features.map((feature) => `popup__feature--${feature}`);
    cardFeatures.querySelectorAll('.popup__feature').forEach((item) => {
      const modifier = item.classList[1];

      if(!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  } else {
    cardFeatures.remove();
  }

  description ? cardDescription.textContent = description : cardDescription.remove();

  if (photos) {
    const cardPhoto = cardPhotos.querySelector('.popup__photo');
    cardPhoto.remove();
    photos.forEach((photo) => {
      const clonedPhoto = cardPhoto.cloneNode(false);
      clonedPhoto.src = photo;
      cardPhotos.appendChild(clonedPhoto);
    });
  } else {
    cardPhotos.remove();
  }

  offersFragment.appendChild(clonedCard);
});

mapCanvas.appendChild(offersFragment);
