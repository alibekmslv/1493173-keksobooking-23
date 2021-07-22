import { renderOffers } from './map.js';
import { debounce } from './utils/debounce.js';
import { isInRange } from './utils.js';

const DEBOUNCE_TIMEOUT = 500;
const OFFER_PRICE_LOW_BORDER = 10000;
const OFFER_PRICE_MIDDLE_BORDER = 50000;

const mapFiltersForm = document.querySelector('.map__filters');
const housingTypeSelect = mapFiltersForm.querySelector('#housing-type');
const housingPriceSelect = mapFiltersForm.querySelector('#housing-price');
const housingRoomsSelect = mapFiltersForm.querySelector('#housing-rooms');
const housingGuestsSelect = mapFiltersForm.querySelector('#housing-guests');
const housingFeaturesNodeList = mapFiltersForm.querySelectorAll('[name="features"]');
const housingFeaturesFieldset = mapFiltersForm.querySelector('#housing-features');

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

const compareOffers = (selectedFeatures) => (offerA, offerB) => {
  const rankA = getOfferRank(offerA, selectedFeatures);
  const rankB = getOfferRank(offerB, selectedFeatures);

  return rankB - rankA;
};

const offerPriceMap = {
  any: { min: 0, max: Infinity },
  low: { min: 0, max: OFFER_PRICE_LOW_BORDER },
  middle: { min: OFFER_PRICE_LOW_BORDER, max: OFFER_PRICE_MIDDLE_BORDER },
  high: { min: OFFER_PRICE_MIDDLE_BORDER, max: Infinity },
};


const filterOffers = (offers) => offers
  .filter(({ offer: { type } }) => housingTypeSelect.value === type || housingTypeSelect.value === 'any')
  .filter(({ offer: { price } }) => isInRange(price, offerPriceMap[housingPriceSelect.value].min, offerPriceMap[housingPriceSelect.value].max))
  .filter(({ offer: { rooms } }) => Number(housingRoomsSelect.value) === rooms || housingRoomsSelect.value === 'any')
  .filter(({ offer: { guests } }) => Number(housingGuestsSelect.value) === guests || housingGuestsSelect.value === 'any');

const getOffersByRating = (offers) => {
  const selectedFeatures = [...housingFeaturesNodeList].filter((item) => item.checked).map((item) => item.value);

  return filterOffers(offers).slice().sort(compareOffers.bind(null, selectedFeatures)());
};

const selects = [housingTypeSelect, housingPriceSelect, housingRoomsSelect, housingGuestsSelect];

const setSelectsChange = (offers, select, callback) => {
  select.addEventListener('change', () => {
    const sortedOffers = getOffersByRating(offers);
    callback(sortedOffers);
  });
};

const setFilterFeaturesChange = (offers, callback) => {
  housingFeaturesFieldset.addEventListener('change', () => {
    const sortedOffers = getOffersByRating(offers);
    callback(sortedOffers);
  });
};

const setMapFilterReset = (offers) => {
  mapFiltersForm.addEventListener('reset', () => {
    renderOffers(offers);
  });
};

const setOffersFilters = (offers) => {
  selects.forEach((select) => setSelectsChange(offers, select, (sortedOffers) => renderOffers(sortedOffers)));
  setFilterFeaturesChange(offers, debounce((sortedOffers) => renderOffers(sortedOffers), DEBOUNCE_TIMEOUT));
  setMapFilterReset(offers);
};

export { setOffersFilters };
