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
const commentField = bigPicture.querySelector('.social__footer-text');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

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


const setHandlers = (removeInnerHandlers) => {
  const hidePicture = (cb) => {
    cb();
    closeButton.removeEventListener('click', onCloseButtonClick);
    bigPicture.removeEventListener('click', onOverlayClick);
    document.removeEventListener('keydown', onEscapeKeydown);

    commentField.value = '';
    bigPicture.classList.add('hidden');
  };

  function onCloseButtonClick(evt) {
    evt.preventDefault();
    hidePicture(removeInnerHandlers);
  }

  function onOverlayClick(evt) {
    if (evt.target.matches('.overlay')) {
      hidePicture(removeInnerHandlers);
    }
  }

  function onEscapeKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();

      hidePicture(removeInnerHandlers);
    }
  }

  closeButton.addEventListener('click', onCloseButtonClick);
  bigPicture.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onEscapeKeydown);
};

const fillPicture = (post) => {
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
};

const showPicture = (picture, posts) => {
  const post = findPost(picture, posts);
  const {comments} = post;

  fillPicture(post);

  const shownCommentsCount = Math.min(comments.length, INITIAL_COMMENTS_COUNT);

  const uploadButton = new CommentsUploadButton({
    button: commentsLoader,
    comments,
    shownCommentsCount,
    addingCommentsCount: UPLOADING_COMMENTS_COUNT,
    initialCommentsCount: INITIAL_COMMENTS_COUNT,
    addComments,
  });
  uploadButton.refreshState();

  setHandlers(uploadButton.setHidden);

  bigPicture.classList.remove('hidden');
};

export {
  showPicture,
};
