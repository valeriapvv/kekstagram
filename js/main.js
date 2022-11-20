import {getRandomElements} from './utils.js';
import {posts} from './data.js';
import {getPicture} from './templates.js';
import {insertElements} from './elements-insert.js';
import {showPicture} from './big-picture.js';
import './form.js';

const shuffledPosts = getRandomElements(posts); // перемешает в случайном порядке.
const picturesContainer = document.querySelector('.pictures');

// отрисует посты
insertElements(shuffledPosts, getPicture, picturesContainer);

// реализует полноэкранный показ поста
const onPictureClick = (evt) => {
  const picture = evt.target.closest('.picture');

  if (picture) {
    evt.preventDefault();

    showPicture(picture, posts);
  }
};

picturesContainer.addEventListener('click', onPictureClick);
