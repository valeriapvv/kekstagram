import {isValidLength} from './utils.js';

const page = document.body;
const forms = document.forms;
const uploadForm = forms['upload-select-image'];
const uploadWindow = uploadForm.querySelector('.img-upload__overlay');
const uploadClose = uploadWindow.querySelector('#upload-cancel');
const hashtagsField = uploadWindow.querySelector('.text__hashtags');
const descriptionField = uploadWindow.querySelector('.text__description');

//// open/close modal
const closeUpload = (evt) => {
  const isPressed = evt.key === ' ' || evt.key === 'Enter';
  const isCloseButtonActive = evt.target === uploadClose && (evt.type === 'click' || isPressed);

  if (!isCloseButtonActive) {
    uploadForm.reset();
  }

  uploadWindow.classList.add('hidden');
  page.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscapeKeydown);
  uploadClose.removeEventListener('click', onCloseClick);
  uploadClose.removeEventListener('keyup', onClosePress);
};

function onEscapeKeydown (evt) {
  if (evt.key === 'Escape') {
    closeUpload(evt);
  }
}

function onCloseClick (evt) {
  closeUpload(evt);
}

function onClosePress (evt) {
  if (evt.key === ' ' || evt.key === 'Enter') {
    closeUpload(evt);
  }
}

const onImageUpload = () => {
  uploadWindow.classList.remove('hidden');
  page.classList.add('modal-open');

  document.addEventListener('keydown', onEscapeKeydown);
  uploadClose.addEventListener('click', onCloseClick);
  uploadClose.addEventListener('keyup', onClosePress);
};

uploadForm.addEventListener('change', onImageUpload);

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
    if (!regexp.test(hashtag) || hashtag.length > 20) {
      return false;
    }
  }

  return true;
};

uploadForm.addEventListener('submit', (evt) => {
  const isValidFieldValues = isValidHashtags() && isValidLength(descriptionField.value, 140);

  if (!isValidFieldValues) {
    evt.preventDefault();
  }
});


