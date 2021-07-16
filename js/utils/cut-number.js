const cutNumber = (number, digitsAfterDot) => {
  const string = number.toString();

  return string.slice(0, string.indexOf('.') + digitsAfterDot + 1);
};

export {cutNumber};
