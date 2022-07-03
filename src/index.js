import Notiflix from 'notiflix';
import {fetchImages} from "./fetchImages";

let input = document.querySelector(".search-input");
let form = document.querySelector(".search-form");
let button = document.querySelector(".input-button");
let gallery = document.querySelector(".gallery")

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchAndDisplayImage();
});

function fetchAndDisplayImage() {
  if (input.value.trim() !== '') {
    fetchImages(input.value.trim()).then(response => {
      console.log(response)
      if (response.data.total === 0) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      } else {
        Notiflix.Notify.success(`Hooray! We found ${response.data.total} images.`);
        showImages(response.data.hits)
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
  gallery.innerHTML = imagesHtml;
}