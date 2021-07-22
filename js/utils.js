const cutNumber = (number, digitsAfterDot) => {
  const string = number.toString();

  return string.slice(0, string.indexOf('.') + digitsAfterDot + 1);
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const isInRange = (num, init, final) => (Math.min(init, final) <= num && num <= Math.max(init, final));

export { cutNumber, isEscEvent, isInRange };
