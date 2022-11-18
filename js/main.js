import {getRandomElements} from './utils.js';
import {posts} from './data.js';
import {getPicture} from './templates.js';
import {insertElements} from './elements-insert.js';

const shuffledPosts = getRandomElements(posts); // перемешаем в случайном порядке.
const picturesContainer = document.querySelector('.pictures');

insertElements(shuffledPosts, getPicture, picturesContainer);
