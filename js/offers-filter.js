import { markersGroup, createMarker, INITIAL_OFFERS_QUANTITY } from './map.js';
import { debounce } from './utils/debounce.js';

const mapFiltersForm = document.querySelector('.map__filters');
const housingTypeSelect = mapFiltersForm.querySelector('#housing-type');
const housingPriceSelect = mapFiltersForm.querySelector('#housing-price');
const housingRoomsSelect = mapFiltersForm.querySelector('#housing-rooms');
const housingGuestsSelect = mapFiltersForm.querySelector('#housing-guests');
const housingFeaturesNodeList = mapFiltersForm.querySelectorAll('[name="features"]');

const getOfferRank = (offer, featuresSelected) => {
  let rank = 0;

  if (offer.offer.features) {
    const { features } = offer.offer;
    features.forEach((feature) => {
      if (featuresSelected.includes(feature)) {
        rank += 1;
      }
    });
  }

  return rank;
};

const compareOffers = (featuresSelected) => (offerA, offerB) => {
  const rankA = getOfferRank(offerA, featuresSelected);
  const rankB = getOfferRank(offerB, featuresSelected);

  return rankB - rankA;
};

const renderPoints = (points) => {
  markersGroup.clearLayers();
  points.slice(0, INITIAL_OFFERS_QUANTITY).forEach((point) => createMarker(point));
};

const setMapFiltersChange = (offers) => {
  mapFiltersForm.addEventListener('change', (evt) => {
    const filteredOffers = offers
      .filter(({ offer: { type } }) => housingTypeSelect.value === type || housingTypeSelect.value === 'any')
      .filter(({ offer: { price } }) => {
        if (housingPriceSelect.value === 'low') {
          return price <= 10000;
        } else if (housingPriceSelect.value === 'middle') {
          return price >= 10000 && price <= 50000;
        } else if (housingPriceSelect.value === 'high') {
          return price >= 50000;
        } else if (housingPriceSelect.value === 'any') {
          return true;
        }
      })
      .filter(({ offer: { rooms } }) => Number(housingRoomsSelect.value) === rooms || housingRoomsSelect.value === 'any')
      .filter(({ offer: { guests } }) => Number(housingGuestsSelect.value) === guests || housingGuestsSelect.value === 'any');


    const featuresSelected = [...housingFeaturesNodeList].filter((item) => item.checked).map((item) => item.value);
    const sortedOffersByRating = filteredOffers.slice().sort(compareOffers.bind(null, featuresSelected)());

    if (evt.target.name === 'features') {
      debounce(() => {
        renderPoints(sortedOffersByRating);
      }, 500)();
    } else {
      renderPoints(sortedOffersByRating);
    }
  });
};

export { setMapFiltersChange };
