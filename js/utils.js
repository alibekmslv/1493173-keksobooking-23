const cutNumber = (number, digitsAfterDot) => {
  const string = number.toString();

  return string.slice(0, string.indexOf('.') + digitsAfterDot + 1);
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const inRange = (num, init, final) => (Math.min(init, final) <= num && num <= Math.max(init, final));

const getRandomInt = (min, max) => {
  if (min < 0 || max < 0) {
    return null;
  }

  if (min === max) {
    return min;
  }

  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloatingPoint = (min, max, digits) => {
  if (min < 0 || max < 0) {
    return null;
  }

  if (min === max) {
    return min;
  }

  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }

  if (digits < 0 || digits === undefined) {
    digits = 0;
  }

  const randomInteger = (Math.random() * (max - min)) + min;

  return randomInteger.toFixed(digits);
};

export { getRandomInt, getRandomFloatingPoint, cutNumber, isEscEvent, inRange };
