import axios from "axios";

export async function fetchImages(inputValue, page) {
  return await axios.get("https://pixabay.com/api/?" +
    "key=28419668-bbd2bc9fd15134f567afa0d2c" +
    "&q=" + inputValue +
    "&image_type=photo" +
    "&orientation=horizontal" +
    "&safesearch=true" +
    "&per_page=40" +
    "&page=" + page
  );
}