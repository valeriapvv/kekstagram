import {findElementById} from "./utils.js";
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

class UploadButton {
  constructor({
    button,
    comments,
    shownCommentsCount,
    initialCommentsCount,
    addingCommentsCount,
    addComments,
  } = {}) {
    this.button = button;
    this.comments = comments;
    this.commentsCount = comments.length;
    this.shownCommentsCount = shownCommentsCount;
    this.addingCommentsCount = addingCommentsCount;
    this.initialCommentsCount = initialCommentsCount;
    this.addComments = addComments;
  }

  _onClick = () => {
    if (this.shownCommentsCount <= this.commentsCount) {
      const firstIndex = this.shownCommentsCount;
      const lastIndex = this.shownCommentsCount + this.addingCommentsCount;
      this.shownCommentsCount += this.addingCommentsCount;

      this.addComments(this.comments.slice(firstIndex, lastIndex));
      this.refreshState();
    }
  };

  refreshState = () => {
    this._setHiddenCommentsCount();

    if (this.hiddenCommentsCount <= 0) {
      this.setHidden();
      return;
    }

    if (this.shownCommentsCount <= this.initialCommentsCount) {
      this._setShown();
    }
  };

  _setHiddenCommentsCount = () => this.hiddenCommentsCount = this.commentsCount - this.shownCommentsCount;

  _setShown = () => {
    this.button.addEventListener('click', this._onClick);
    this.button.hidden = false;
  };

  setHidden = () => {
    this.button.removeEventListener('click', this._onClick);
    this.button.hidden = true;
  }
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

  const uploadButton = new UploadButton({
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
