import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import icon from './img/bi_x-octagon.svg';

import { addGallery, loaderFn, clearGallery } from './js/render-functions';
import { requestPixabay } from './js/pixabay-api';

const newGallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
});

const form = document.querySelector('.form');
const input = document.querySelector('.request');

form.addEventListener('submit', event => {
  event.preventDefault();

  clearGallery();

  const inputText = input.value.trim();

  if (!inputText) {
    input.value = '';
    return addErrorMessage('Search field must not be empty. Please, fill it!');
  }

  loaderFn('inline-block');

  requestPixabay(inputText)
    .then(data => {
      if (data.hits.length === 0) {
        addErrorMessage(
          'Sorry, there are no images matching your search query. Please, try again!'
        );
      } else {
        addGallery(data.hits);
        newGallery.refresh();
      }
    })
    .catch(error => addErrorMessage(error.message))
    .finally(() => {
      loaderFn('none');
      input.value = '';
    });
});

// addGallery(response.data.hits);
// .catch(error => addErrorMessage(error.message))

//  if (imgObject.length === 0) {
//     addErrorMessage(
//       'Sorry, there are no images matching your search query. Please, try again!'
//     );
//   } else {

//  newGallery.refresh();

const addErrorMessage = message => {
  iziToast.show({
    message: message,
    messageColor: '#fafafb',
    messageSize: '16px',
    messageLineHeight: '1.5',
    backgroundColor: '#ef4040',
    theme: 'dark',
    iconUrl: icon,
    position: 'topRight',
  });
};
