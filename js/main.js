import {getRandomElements} from './utils.js';
import {posts} from './data.js';
import {getPicture} from './templates.js';
import {insertElements} from './elements-insert.js';
import {showPicture, hidePicture} from './big-picture.js';
import './form.js';

const shuffledPosts = getRandomElements(posts); // перемешает в случайном порядке.
const picturesContainer = document.querySelector('.pictures');

// отрисует посты
insertElements(shuffledPosts, getPicture, picturesContainer);

// реализует полноэкранный показ поста
function onPictureClose(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();

    hidePicture();
    document.removeEventListener('keydown', onPictureClose);
  }
}

const onPictureClick = (evt) => {
  const picture = evt.target.closest('.picture');

  if (picture) {
    evt.preventDefault();

    showPicture(picture, posts);
    document.addEventListener('keydown', onPictureClose);
  }
};

picturesContainer.addEventListener('click', onPictureClick);
