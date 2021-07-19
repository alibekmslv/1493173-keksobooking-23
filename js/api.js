const getOffers = (onSuccess, onFail) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Ошибка получения данных.');
      }
    })
    .then((offers) => onSuccess(offers))
    .catch((error) => onFail(error.message));
};

const postOffer = (onSuccess, onFail, formData) => {
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
        onFail('Ошибка размещения объявления.');
      }
    })
    .catch(() => onFail('Ошибка размещения объявления.'));
};

export { getOffers, postOffer };
