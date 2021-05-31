function getRandomInt(min, max) {
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
}


function getRandomFloatingPoint (min, max, digits) {
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
}

getRandomInt();
getRandomFloatingPoint();
