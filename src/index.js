import Notiflix from 'notiflix';
import {fetchImages} from "./fetchImages";

let input = document.querySelector(".search-input");
let form = document.querySelector(".search-form");
let loadMore = document.querySelector(".load-more");
let gallery = document.querySelector(".gallery")
let page = 1;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchAndDisplayImage();
});

function fetchAndDisplayImage() {
  if (input.value.trim() !== '') {
    page = 1;
    gallery.innerHTML = "";
    fetchImages(input.value.trim(), page).then(response => {
      console.log(response)
      if (response.data.total === 0) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      } else {
        Notiflix.Notify.success(`Hooray! We found ${response.data.total} images.`);
        showImages(response.data.hits)

        if (response.data.total > 40) {
          loadMore.classList.remove("hidden")
        }
      }
    })
  } else {
    Notiflix.Notify.failure("Please, write something!");
  }
}

function showImages(images) {
  let imagesHtml = "";
  for (let image of images) {
    let imageTemplate = `<div class="photo-card">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          <span>${image.likes}</span>
        </p>
        <p class="info-item">
          <b>Views</b>
          <span>${image.views}</span>
        </p>
        <p class="info-item">
          <b>Comments</b>
          <span>${image.comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads</b>
        <span>${image.downloads}</span>
        </p>
      </div>
    </div>`;
    imagesHtml += imageTemplate;
  }
  gallery.insertAdjacentHTML('beforeend', imagesHtml);
}

loadMore.addEventListener("click", () => {
  loadMoreImages();
})

function loadMoreImages() {
  page++;
  fetchImages(input.value.trim(), page).then(response => {
    showImages(response.data.hits);
    if (response.data.total < page * 40) {
      loadMore.classList.add('hidden')
    }
  })
}