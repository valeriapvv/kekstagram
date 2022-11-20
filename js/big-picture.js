import {CommentsUploadButton} from './comments-upload-button.js';
import {findElementById} from './utils.js';
const INITIAL_COMMENTS_COUNT = 5;
const UPLOADING_COMMENTS_COUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const imageElement = bigPicture.querySelector('.big-picture__img > img');
const likesCountElement = bigPicture.querySelector('.likes-count');
const descriptionElement = bigPicture.querySelector('.social__caption');
const commentsCountElement =  bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentItem = commentsList.querySelector('.social__comment');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const findPost = (picture, posts) => {
  const id = parseInt(picture.dataset.pictureId, 10);

  return findElementById(posts, id);
};

const addComments = (comments) => {
  const documentFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const {avatar, message, name} = comment;
    const commentElement = commentItem.cloneNode(true);
    const commentAvatar = commentElement.querySelector('.social__picture');
    const commentText = commentElement.querySelector('.social__text');

    commentAvatar.src = avatar;
    commentAvatar.alt = name;
    commentText.textContent = message;

    documentFragment.append(commentElement);
  });

  commentsList.append(documentFragment);
};

const showPicture = (picture, posts) => {
  const post = findPost(picture, posts);
  const {
    url,
    likes,
    comments,
    description,
  } = post;

  const commentsCount = comments.length;

  imageElement.src = url;
  imageElement.alt = description;
  descriptionElement.textContent = description;
  likesCountElement.textContent = likes;
  commentsCountElement.textContent = commentsCount;
  commentsList.textContent = '';

  addComments(comments.slice(0, INITIAL_COMMENTS_COUNT));

  const shownCommentsCount = Math.min(commentsCount, INITIAL_COMMENTS_COUNT);

  const uploadButton = new CommentsUploadButton({
    button: commentsLoader,
    comments,
    shownCommentsCount,
    addingCommentsCount: UPLOADING_COMMENTS_COUNT,
    initialCommentsCount: INITIAL_COMMENTS_COUNT,
    addComments,
  });
  uploadButton.refreshState();

  bigPicture.classList.remove('hidden');
};

const hidePicture = () => {
  bigPicture.classList.add('hidden');
};

export {
  showPicture,
  hidePicture,
};
