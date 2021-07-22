import { offerFormToActiveState, pageFormsToDisabledState, pageFormsToActiveState } from './form.js';
import { createCard } from './card.js';
import { cutNumber } from './utils.js';
import { getOffers } from './api.js';
import { showErrorModal } from './modal.js';
import { setOffersFilters } from './offers-filter.js';

const INITIAL_POINT = { lat: 35.68065, lng: 139.76702 };
const INITIAL_OFFERS_QUANTITY = 10;
const DEFAULT_PIN_ICON = {
  url: '../img/main-pin.svg',
  width: 52,
  height: 52,
};
const DEFAULT_MARKER_ICON = {
  url: '../img/pin.svg',
  width: 40,
  height: 40,
};
const MAP_ZOOM = 12;

const offerAddressInput = document.querySelector('#address');

pageFormsToDisabledState();

const mainPinIcon = L.icon({
  iconUrl: DEFAULT_PIN_ICON.url,
  iconSize: [DEFAULT_PIN_ICON.width, DEFAULT_PIN_ICON.height],
  iconAnchor: [DEFAULT_PIN_ICON.width / 2, DEFAULT_PIN_ICON.height],
});

const mainPinMarker = L.marker(
  INITIAL_POINT,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const offersIcon = L.icon({
  iconUrl: DEFAULT_MARKER_ICON.url,
  iconSize: [DEFAULT_MARKER_ICON.width, DEFAULT_MARKER_ICON.height],
  iconAnchor: [DEFAULT_MARKER_ICON.width / 2, DEFAULT_MARKER_ICON.height],
});

const setInitialAddress = () => {
  offerAddressInput.value = `${INITIAL_POINT.lat}, ${INITIAL_POINT.lng}`;

  mainPinMarker.setLatLng(INITIAL_POINT);
};
setInitialAddress();

const map = L.map('map-canvas');

const markersGroup = L.layerGroup().addTo(map);

const createMarker = (point) => {
  const { lat, lng } = point.location;
  const marker = L.marker({ lat, lng }, { icon: offersIcon });

  marker.addTo(markersGroup).bindPopup(createCard(point));
};

const renderOffers = (offers) => {
  markersGroup.clearLayers();
  offers.slice(0, INITIAL_OFFERS_QUANTITY).forEach((offer) => createMarker(offer));
};

map.on('load', () => {
  offerAddressInput.readOnly = true;

  getOffers(
    (offers) => {
      setOffersFilters(offers);
      renderOffers(offers);
      pageFormsToActiveState();
    },
    (error) => {
      showErrorModal(error, 'Закрыть');
      offerFormToActiveState();
    },
  );
});

const setMapInitialView = () => map.setView(INITIAL_POINT, MAP_ZOOM);
setMapInitialView();

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

export { setInitialAddress, setMapInitialView, renderOffers };
