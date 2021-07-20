const cardFragment = document.querySelector('#card').content;
const cardTemplate = cardFragment.querySelector('.popup');

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

  avatar ? avatarElement.src = avatar : avatarElement.remove();
  title ? titleElement.textContent = title : titleElement.remove();
  address ? addressElement.textContent = address : addressElement.remove();
  price ? priceElement.textContent = `${price} + ₽/ночь` : priceElement.remove();

  switch (type) {
    case 'palace':
      typeElement.textContent = 'Дворец';
      break;
    case 'flat':
      typeElement.textContent = 'Квартира';
      break;
    case 'house':
      typeElement.textContent = 'Дом';
      break;
    case 'bungalow':
      typeElement.textContent = 'Бунгало';
      break;
    case 'hotel':
      typeElement.textContent = 'Отель';
      break;
    default:
      typeElement.remove();
      break;
  }

  rooms && guests ? capacityElement.textContent = `${rooms} комнаты для ${guests} гостей` : capacityElement.remove();
  checkin && checkout ? timeElement.textContent = `Заезд после ${checkin}, выезд до ${checkout}` : capacityElement.remove();

  if (features) {
    const modifiers = features.map((feature) => `popup__feature--${feature}`);
    featuresElement.querySelectorAll('.popup__feature').forEach((item) => {
      const modifier = item.classList[1];

      if(!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  } else {
    featuresElement.remove();
  }

  description ? descriptionElement.textContent = description : descriptionElement.remove();

  if (photos) {
    const cardPhoto = photosElement.querySelector('.popup__photo');
    cardPhoto.remove();
    photos.forEach((photo) => {
      const clonedPhoto = cardPhoto.cloneNode(false);
      clonedPhoto.src = photo;
      photosElement.appendChild(clonedPhoto);
    });
  } else {
    photosElement.remove();
  }

  return clonedCard;
};

export { createCard };
