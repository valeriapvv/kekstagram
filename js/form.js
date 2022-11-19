const page = document.body;
const forms = document.forms;
const uploadForm = forms['upload-select-image'];
const uploadWindow = uploadForm.querySelector('.img-upload__overlay');
const uploadClose = uploadForm.querySelector('#upload-cancel');

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

uploadForm.addEventListener('reset', () => {
  // console.log('!!! --- FORM WAS CLEANED --- !!!');
});
