import {switchFormToDisabledState, switchFormToActiveState} from './form.js';
import { cutNumber } from './utils/cut-number.js';

const INITIAL_POINT = {lat: 35.68065, lng: 139.76702};
const offerAddressInput = document.querySelector('#address');

switchFormToDisabledState();

offerAddressInput.value = `${INITIAL_POINT.lat}, ${INITIAL_POINT.lng}`;

const map = L.map('map-canvas').on('load', () => {
  offerAddressInput.disabled = true;
  switchFormToActiveState();
}).setView(INITIAL_POINT, 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

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

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  offerAddressInput.value = `${cutNumber(lat, 5)}, ${cutNumber(lng, 5)}`;
});