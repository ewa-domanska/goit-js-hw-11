import Notiflix from 'notiflix';
import {fetchImages} from "./fetchImages";

let input = document.querySelector(".search-input");
let form = document.querySelector(".search-form");
let button = document.querySelector(".input-button");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchAndDisplayImage();
});

function fetchAndDisplayImage() {
  if (input.value.trim() !== '') {
    fetchImages(input.value.trim()).then(response => {
      console.log(response)
      if (response.data.total === 0){
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      }
    })
  } else {
    Notiflix.Notify.failure("Please, write something!");
  }
}
