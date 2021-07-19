import { switchFormToDisabledState, switchFormToActiveState } from './form.js';
import { createCard } from './card.js';
import { cutNumber } from './utils.js';
import { getOffers } from './api.js';
import { showErrorModal } from './modal.js';

const INITIAL_POINT = { lat: 35.68065, lng: 139.76702 };
const INITIAL_OFFERS_QUANTITY = 10;

const offerAddressInput = document.querySelector('#address');

switchFormToDisabledState();

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  INITIAL_POINT,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const setInitialAddress = () => {
  offerAddressInput.value = `${INITIAL_POINT.lat}, ${INITIAL_POINT.lng}`;

  mainPinMarker.setLatLng(INITIAL_POINT);
};

const map = L.map('map-canvas').on('load', () => {
  offerAddressInput.readOnly = true;

  setInitialAddress();
  switchFormToActiveState();
}).setView(INITIAL_POINT, 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();

  offerAddressInput.value = `${cutNumber(lat, 5)}, ${cutNumber(lng, 5)}`;
});

const createMarker = (point) => {
  const { lat, lng } = point.location;
  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const marker = L.marker({ lat, lng }, { icon });

  marker.addTo(map).bindPopup(createCard(point));
};

getOffers(
  (offers) => {
    offers.slice(0, INITIAL_OFFERS_QUANTITY).forEach((offer) => {
      createMarker(offer);
    });
  },
  (error) => {
    showErrorModal(error, 'Закрыть');
  },
);

export { setInitialAddress };
