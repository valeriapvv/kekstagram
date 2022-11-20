import {isValidLength} from './utils.js';

const page = document.body;
const uploadForm = document.forms['upload-select-image'];
const uploadWindow = uploadForm.querySelector('.img-upload__overlay');
const uploadClose = uploadWindow.querySelector('#upload-cancel');
const hashtagsField = uploadWindow.querySelector('.text__hashtags');
const descriptionField = uploadWindow.querySelector('.text__description');

//// open/close modal
const closeUpload = () => {
  uploadForm.reset();

  uploadWindow.classList.add('hidden');
  page.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscapeKeydown);
  uploadWindow.removeEventListener('click', onOverlayClick);
  uploadClose.removeEventListener('click', onCloseClick);
  uploadClose.removeEventListener('keyup', onClosePress);
  uploadForm.removeEventListener('submit', onSubmit);
};

function onEscapeKeydown (evt) {
  if (evt.target === hashtagsField || evt.target === descriptionField) {
    return;
  }

  if (evt.key === 'Escape') {
    closeUpload();
  }
}

function onOverlayClick (evt) {
  if (evt.target === uploadWindow) {
    closeUpload();
  }
}

function onCloseClick (evt) {
  evt.preventDefault();
  closeUpload();
}

function onClosePress (evt) {
  if (evt.key === ' ' || evt.key === 'Enter') {
    evt.preventDefault();
    closeUpload();
  }
}

//// fields validation
const isValidHashtags = () => {
  const fieldValue = hashtagsField.value
    .toLowerCase()
    .replace(/\s+$/, '');
  const hashtags = Array.from(new Set(fieldValue.split(/\s+/)));
  const regexp = /^#(\w|\p{L})+$/ui;

  if (!fieldValue) {
    return true;
  }

  if (hashtags.length > 5) {
    return false;
  }

  for (const hashtag of hashtags) {
    const isValidHashtag = regexp.test(hashtag) && isValidLength(hashtag, 20);

    if (!isValidHashtag) {
      return false;
    }
  }

  return true;
};

function onSubmit(evt) {
  const isValidFieldValues = isValidHashtags() && isValidLength(descriptionField.value, 140);

  if (!isValidFieldValues) {
    evt.preventDefault();
  }
}

// form activation
const onImageUpload = () => {
  uploadWindow.classList.remove('hidden');
  page.classList.add('modal-open');

  uploadWindow.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onEscapeKeydown);
  uploadClose.addEventListener('click', onCloseClick);
  uploadClose.addEventListener('keyup', onClosePress);
  uploadForm.addEventListener('submit', onSubmit);
};

const setUploadFormHandlers = () => {
  uploadForm.addEventListener('change', onImageUpload);
};

export {setUploadFormHandlers};


