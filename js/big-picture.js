const bigPicture = document.querySelector('.big-picture');
const imageElement = bigPicture.querySelector('.big-picture__img > img');
const likesCountElement = bigPicture.querySelector('.likes-count');
const descriptionElement = bigPicture.querySelector('.social__caption');
const commentsCountElement =  bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentItem = commentsList.querySelector('.social__comment');

const findPost = (picture, posts) => {
  const id = parseInt(picture.dataset.pictureId, 10);

  return posts.find((post) => parseInt(post.id, 10) === id);
};

const addComments = (comments) => {
  commentsList.textContent = '';

  comments.forEach((comment) => {
    const {avatar, message, name} = comment;
    const commentElement = commentItem.cloneNode(true);
    const commentAvatar = commentElement.querySelector('.social__picture');
    const commentText = commentElement.querySelector('.social__text');

    commentAvatar.src = avatar;
    commentAvatar.alt = name;
    commentText.textContent = message;

    commentsList.append(commentElement);
  });
};

const showPicture = (picture, posts) => {
  const post = findPost(picture, posts);
  const {
    url,
    likes,
    comments,
    description,
  } = post;

  imageElement.src = url;
  likesCountElement.textContent = likes;
  descriptionElement.textContent = description;
  commentsCountElement.textContent = comments.length;

  addComments(comments);

  bigPicture.classList.remove('hidden');
};

const hidePicture = () => {
  bigPicture.classList.add('hidden');
};

export {
  showPicture,
  hidePicture,
};
