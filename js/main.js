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


//// Генерация данных
// Константы
const NAMES = ['Марк', 'Кекс', 'Барсик', 'Бегемот'];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const POSTS_COUNT = 25;

const TOTAL_COMMENTS_COUNT = 250;


// Функции
const getPostId = createCounterGenerator();
const getCommentId = createCounterGenerator();
const getRandomCommentId = createUniqueNumberGenerator(1, TOTAL_COMMENTS_COUNT);
const getElementById = (list, id) => list.find((element) => element.id === id);

const getRandomComments = (commentsList) => {
  const commentsCount = getRandomPositiveInteger(0, 10);

  const randomComments = Array.from({length: commentsCount}, () => {
    const randomId = getRandomCommentId();
    const comment = getElementById(commentsList, randomId) ?? 'Неопознанный комментарий';
    return comment;
  });

  return randomComments;
};


// Данные
const comments = Array.from({length: TOTAL_COMMENTS_COUNT}, () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomElements(MESSAGES, getRandomPositiveInteger(1, 2)).join(' '),
  name: getRandomArrayElement(NAMES),
}));

const getPost = () => {
  const id = getPostId();

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: `Описание к фотографии с id ${id}`,
    likes: getRandomPositiveInteger(15, 200),
    comments: getRandomComments(comments),
  }
};

const posts = Array.from({length: POSTS_COUNT}, getPost);
