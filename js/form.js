import {isValidLength} from './utils.js';

const page = document.body;
const uploadForm = document.forms['upload-select-image'];
const uploadWindow = uploadForm.querySelector('.img-upload__overlay');
const uploadClose = uploadWindow.querySelector('#upload-cancel');
const textFieldsContainer = uploadWindow.querySelector('.img-upload__text');
const hashtagsField = textFieldsContainer.querySelector('.text__hashtags');
const commentField = textFieldsContainer.querySelector('.text__description');
const fileUploadInput = uploadForm.querySelector('#upload-file');
let errorElement;

const pristine = new Pristine(uploadForm, {
  // class of the parent element where the error/success class is added
  classTo: 'img-upload__text',
  errorClass: 'has-danger',
  successClass: 'has-success',
  // class of the parent element where error text element is appended
  errorTextParent: 'img-upload__text',
  // type of element to create for the error text
  errorTextTag: 'div',
  // class of the error text element
  errorTextClass: 'text-help',
});

const setErrorMessageStyles = () => {
  errorElement = textFieldsContainer.querySelector('.pristine-error');

  errorElement.style.position = 'absolute';
  errorElement.style.left = '50%';
  errorElement.style.transform = 'translateX(-50%)';
  errorElement.style.maxHeight = '30px';
  errorElement.style.fontSize = '14px';
  errorElement.style.color = 'tomato';
};

//// open/close modal
const closeUpload = () => {
  pristine.reset();
  uploadForm.reset();

  uploadWindow.classList.add('hidden');
  page.classList.remove('modal-open');

  cancelFieldsFocusHandler(textFieldsContainer);
  document.removeEventListener('keydown', onEscapeKeydown);
  uploadWindow.removeEventListener('click', onOverlayClick);
  uploadClose.removeEventListener('click', onCloseClick);
  uploadClose.removeEventListener('keyup', onClosePress);
  uploadForm.removeEventListener('submit', onSubmit);
};

function onEscapeKeydown (evt) {
  if (evt.target === hashtagsField || evt.target === commentField) {
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
const hashtagsErrorType = {
  COUNT: 'count',
  VALUE: 'value',
  LENGTH: 'length',
};
const hashtagsError = {
  count: 'Не более 5 хэш-тегов',
  value: 'Хэш-тег начинается со знака \'#\' и может содержать только буквы, цифры и подчеркивание \'_\'',
  length: 'Хэш-тег имеет длину не более 20 символов',
  _message: null,
  /**
   * @param {string} type
   */
  set message(type) {
    this._message = this[type] || null;
  },
  get message() {
    return this._message;
  },
};

const isValidHashtags = (fieldValue) => {
  const value = fieldValue.toLowerCase().replace(/\s+$/, '');
  const hashtags = Array.from(new Set(value.split(/\s+/)));
  const regexp = /^#(\w|\p{L})+$/ui;

  if (!value) {
    return true;
  }

  if (hashtags.length > 5) {
    hashtagsError.message = hashtagsErrorType.COUNT;
    return false;
  }

  for (const hashtag of hashtags) {
    const isValidValue = regexp.test(hashtag);
    const isValidHashtagLength = isValidLength(hashtag, 20);

    if (!isValidValue) {
      hashtagsError.message = hashtagsErrorType.VALUE;
      return false;
    }

    if (!isValidHashtagLength) {
      hashtagsError.message = hashtagsErrorType.LENGTH;
      return false;
    }
  }

  return true;
};

pristine.addValidator(
  hashtagsField,
  isValidHashtags,
  () => {
    if (!errorElement) {
      setTimeout(setErrorMessageStyles, 0);
    }

    return hashtagsError.message;
  },
  2,
);

const commentFieldErrorMessage = 'Комментарий должен иметь длину не более 140 символов';

pristine.addValidator(
  commentField,
  (value) => isValidLength(value, 140),
  () => {
    if (!errorElement) {
      setTimeout(setErrorMessageStyles, 0);
    }

    return commentFieldErrorMessage;
  },
);

const isValidField = (field) => {
  const errors = pristine.getErrors(field);

  if (errors.length) {
    return false;
  }

  return true;
};

function  onFocusin (evt) {
  const element = evt.target;

  if (element.matches('input') || element.matches('textarea')) {
    pristine.validate(element);
  }
}

function setFieldsFocusHandler (fieldsContainer) {
  fieldsContainer.addEventListener('focusin', onFocusin);
}

function cancelFieldsFocusHandler (fieldsContainer) {
  fieldsContainer.removeEventListener('focusin', onFocusin);
}

// Проверка на наличие файла в fileUploadInput (сделать)
function onSubmit(evt) {
  if (!fileUploadInput.value) {
    evt.preventDefault();
    throw new Error('Нет файлов в поле загрузки файлов');
  }

  if (!pristine.validate()) {
    evt.preventDefault();

    if (!isValidField(hashtagsField)) {
      hashtagsField.focus();
      return;
    }

    if (!isValidField(commentField)) {
      commentField.focus();
      return;
    }
  }

  pristine.reset();
}

// form activation
const onImageUpload = () => {
  uploadWindow.classList.remove('hidden');
  page.classList.add('modal-open');

  setFieldsFocusHandler(textFieldsContainer);
  uploadWindow.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onEscapeKeydown);
  uploadClose.addEventListener('click', onCloseClick);
  uploadClose.addEventListener('keyup', onClosePress);
  uploadForm.addEventListener('submit', onSubmit);
};

const setUploadFormHandlers = () => {
  uploadForm.addEventListener('change', onImageUpload);
};

////
// console.log('код модуля')
// uploadWindow.classList.remove('hidden');
// page.classList.add('modal-open');
// uploadForm.addEventListener('change', onImageUpload);

export {setUploadFormHandlers};


