const isValidLength = (string, maxLength) => string.length <= maxLength;

isValidLength('String', 10);

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

getRandomPositiveInteger(0, 10);
