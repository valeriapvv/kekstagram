const pictureTemplate = document.querySelector('#picture').content.children[0];

const getPicture = ({url, likes, comments} = {}) => {
  const template = pictureTemplate.cloneNode(true);
  const pictureImg = template.querySelector('.picture__img');
  const pictureLikes = template.querySelector('.picture__likes');
  const pictureComments = template.querySelector('.picture__comments');

  pictureImg.src = url || '';
  pictureLikes.textContent = parseInt(likes, 10) || 0;
  pictureComments.textContent = comments?.length || 0;

  return template;
}

export {
  getPicture,
};
