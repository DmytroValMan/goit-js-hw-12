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
const btnMore = document.querySelector('.btn-more');

let pageNumber = 1;
let perPage = 15;
let inputText = '';
let totalImages = 0;
let totalPages = 1;

let requestParams = {
  page: pageNumber,
  per_page: perPage,
};

form.addEventListener('submit', async event => {
  event.preventDefault();

  clearGallery();
  btnMoreFn('none');

  inputText = input.value.trim();

  if (!inputText) {
    input.value = '';
    return addErrorMessage('Search field must not be empty. Please, fill it!');
  }

  loaderFn('inline-block');

  pageNumber = 1;
  requestParams = {
    page: pageNumber,
    per_page: perPage,
  };

  try {
    const data = await requestPixabay(inputText, requestParams);
    if (data.hits.length === 0) {
      addErrorMessage(
        'Sorry, there are no images matching your search query. Please, try again!'
      );
    } else {
      addGallery(data.hits);
      addScroll();
      newGallery.refresh();
      btnMoreFn('block');
      totalImages = data.totalHits;
      totalPages = Math.ceil(totalImages / perPage);
      btnMore.addEventListener('click', () => renderMore());
    }
  } catch (error) {
    addErrorMessage(error.message);
  } finally {
    loaderFn('none');
    input.value = '';
  }
});

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

const btnMoreFn = state => (btnMore.style.display = state);

const renderMore = async () => {
  pageNumber++;
  requestParams = {
    page: pageNumber,
    per_page: perPage,
  };

  btnMoreFn('none');

  loaderFn('inline-block');

  try {
    const data = await requestPixabay(inputText, requestParams);
    addGallery(data.hits);
    addScroll();
    newGallery.refresh();
  } catch (error) {
    addErrorMessage(error.message);
  } finally {
    loaderFn('none');
    if (pageNumber >= totalPages) {
      btnMoreFn('none');
      return addErrorMessage(
        "We're sorry, but you've reached the end of search results."
      );
    }
    btnMoreFn('block');
  }
};

const addScroll = () => {
  const imgItem = document.querySelector('.gallery-item');
  const imgItemSize = imgItem.getBoundingClientRect();
  const imgItemScrollSize = imgItemSize.height * 2;
  scrollBy(0, imgItemScrollSize);
};
