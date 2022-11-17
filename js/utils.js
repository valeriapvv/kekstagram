const isValidLength = (string, maxLength) => string.length <= maxLength;

const getRandomNumber = (min, max, fractionDigitsNumber = 0) => {
  const lower = Math.min(min, max);
  const upper = Math.max(min, max);

  const lowerFixed = Math.ceil(lower * 10**fractionDigitsNumber) / 10**fractionDigitsNumber;
  const upperFixed = Math.floor(upper * 10**fractionDigitsNumber) / 10**fractionDigitsNumber;

  let number = lowerFixed + Math.random() * (upperFixed - lowerFixed);
  number = +number.toFixed(fractionDigitsNumber);
  number = !number ? 0 : number;

  if (number < lower || number > upper) {
    throw new Error(`Невозможно получить число с заданным
    округлением ${fractionDigitsNumber} знаков после запятой
    из заданного диапазона ${lower} - ${upper}`);
  }

  return number;
};

const getRandomPositiveInteger = (min, max) => {
  try {
    return getRandomNumber(Math.abs(min), Math.abs(max));
  } catch (error) {
    throw new Error(`Невозможно получить целое число из
      заданного диапазона ${Math.abs(min)} - ${Math.abs(max)}`);
  }
};

const createUniqueNumberGenerator = (min, max) => {
  const createdNumbers = [];
  const maxLength = Math.max(min, max) - Math.min(min, max) + 1;

  return () => {
    if (createdNumbers.length >= maxLength) {
      return null;
    }

    let number = getRandomPositiveInteger(min, max);

    while (createdNumbers.includes(number)) {
      number = getRandomPositiveInteger(min, max);
    }

    createdNumbers.push(number);
    return number;
  };
};

const getRandomArrayElement = (array) => array[getRandomPositiveInteger(0, array.length - 1)];

const getRandomElements = (array, elementsCount) => {
  const newArray = array.slice();
  elementsCount = Math.max(0, Math.min(array.length, elementsCount));

  for (let i = 0; i < elementsCount; i++) {
    const randomIndex = getRandomPositiveInteger(0, array.length);
    const swap = newArray[i];

    newArray[i] = newArray[randomIndex];
    newArray[randomIndex] = swap;
  }

  return newArray.slice(0, elementsCount);
};

const createCounterGenerator = () => {
  let counter = 0;

  return () => ++counter;
};

export {
  isValidLength,
  getRandomPositiveInteger,
  createUniqueNumberGenerator,
  getRandomArrayElement,
  getRandomElements,
  createCounterGenerator,
};
