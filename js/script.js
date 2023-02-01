const form = document.querySelector("#searchForm")
const searchText = document.querySelector("#searchText");
const sort = document.querySelector("#sort")
const number = document.querySelector("#number");
const size = document.querySelector("#size");
const safeSearch = document.querySelector('#safeSearch')
const imagesDiv = document.querySelector(".images");
const imagesContainerDiv = document.querySelector(".imagesContainerDiv")

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputSearchText = searchText.value;
  const inputNumber = number.value;
  const inputSize = size.value;
  const inputSafeSearch = safeSearch.value;
  const inputSort = sort.value;
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=87f5f9dc196273d6ddf97a2eae37ba07&text=${inputSearchText}&per_page=500&sort=${inputSort}&safe_search=${inputSafeSearch}&format=json&nojsoncallback=1`;

  fetch(url)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        throw "Fetch failed";
      }
    })
    .then((data) => {
      console.log(data)
      removeImagesAndErrors();
      fetchImages(inputNumber, inputSize, data);
    })
    .catch((error) => {
      removeImagesAndErrors();
      const errorMessage = document.createElement('h3');
      errorMessage.classList.add('errorMsg')
      imagesContainerDiv.prepend(errorMessage);
      errorMessage.innerText = `Fel har uppstått, vänligen försök igen! ${error}`;
    });
})

const removeImagesAndErrors = function () {
  const oldImages = document.getElementsByClassName("images");
  while (oldImages.length) {
    oldImages[0].remove();
  }
  const oldH3 = document.getElementsByClassName("errorMsg");
  while (oldH3.length) {
    oldH3[0].remove();
  }
}
const fetchImages = function (inputNumber, inputSize, data) {
  for (let i = 1; i <= inputNumber; i++) {
    let image = document.createElement("img");
    image.classList.add("images");
    imagesContainerDiv.append(image);
    image.src = `https://live.staticflickr.com/${data.photos.photo[i].server}/${data.photos.photo[i].id}_${data.photos.photo[i].secret}_${inputSize}.jpg`;
    image.onclick = function () {
      window.open(this.src, '_blank');
    };
  }
};
