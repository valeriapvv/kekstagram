import {
  getRandomPositiveInteger,
  createUniqueNumberGenerator,
  getRandomArrayElement,
  getRandomElements,
  createCounterGenerator,
} from './utils.js';

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
const getCommentById = (list, id) => list.find((comment) => comment.id === id);

const getRandomComments = (commentsList) => {
  const commentsCount = getRandomPositiveInteger(0, 10);

  const randomComments = Array.from({length: commentsCount}, () => {
    const randomId = getRandomCommentId();
    const comment = getCommentById(commentsList, randomId) ?? 'Неопознанный комментарий';
    return comment;
  });

  return randomComments;
};

const getPost = (commentsList) => {
  const id = getPostId();

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: `Описание к фотографии с id ${id}`,
    likes: getRandomPositiveInteger(15, 200),
    comments: getRandomComments(commentsList),
  }
};

const createPostGenerator = (commentsList) => () => getPost(commentsList);


// Данные
const comments = Array.from({length: TOTAL_COMMENTS_COUNT}, () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomElements(MESSAGES, getRandomPositiveInteger(1, 2)).join(' '),
  name: getRandomArrayElement(NAMES),
}));

const posts = Array.from({length: POSTS_COUNT}, createPostGenerator(comments));

export {
  posts,
}
