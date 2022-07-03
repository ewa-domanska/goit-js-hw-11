let input = document.querySelector(".search-input");
let form = document.querySelector(".search-form");
let button = document.querySelector(".input-button");

input.addEventListener("input", () => {
  if (input.value.trim().length > 0) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
})

form.addEventListener("submit", (e) => {
  fetchAndDisplayImage();
});

function fetchAndDisplayImage() {

  console.log(input.value.trim())

}
