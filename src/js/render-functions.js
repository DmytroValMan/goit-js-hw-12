const galleryList = document.querySelector('.gallery');

const loader = document.querySelector('.loader');

export const addGallery = imgArray => {
  const imagesGallary = imgArray
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item"><a class="gallery-link" href="${largeImageURL}"><img class="gallery-image" src="${webformatURL}" alt="${tags}" width="640" height="360"/></a>
        <div class="gallery-item-wrapper">
        <p class="galery-item-propety">Likes<span class="galery-item-value">${likes}</span></p>
        <p class="galery-item-propety">Views<span class="galery-item-value">${views}</span></p>
        <p class="galery-item-propety">Comments<span class="galery-item-value">${comments}</span></p>
        <p class="galery-item-propety">Downloads<span class="galery-item-value">${downloads}</span></p>
        </div>
        </li>`
    )
    .join('');
  galleryList.insertAdjacentHTML('beforeend', imagesGallary);
};

export const loaderFn = state => (loader.style.display = state);

export const clearGallery = () => (galleryList.innerHTML = '');
