const getOffers = (onSuccess, onFailure) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Ошибка получения данных.');
      }
    })
    .then((offers) => onSuccess(offers))
    .catch((error) => onFailure(error.message));
};

const postOffer = (onSuccess, onFailure, formData) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFailure('Ошибка размещения объявления.');
      }
    })
    .catch(() => onFailure('Ошибка размещения объявления.'));
};

export { getOffers, postOffer };
