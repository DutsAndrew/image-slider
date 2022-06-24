let imgArray = [
  '/imgs/cat-1.jpg',
  '/imgs/cat-2.jpg',
  '/imgs/cat-3.jpg',
  '/imgs/cat-4.jpg',
  '/imgs/cat-5.jpg',
];

const imgCarousel = document.getElementById('image-carousel');
const arrowLeft = document.getElementById('image-slider-arrow-left');
  arrowLeft.addEventListener('click', rotateCarousel);
const arrowRight = document.getElementById('image-slider-arrow-right');
  arrowRight.addEventListener('click', rotateCarousel);

function rotateCarousel(e) {
  let selectedArrow = e.composedPath()[0].id;
  console.log(selectedArrow);
}

function carouselController() {
  createImgLibrary();
  startCarousel();
}

function createImgLibrary() {
  console.log(imgArray);
  let img;
  for (let i = 0; i < imgArray.length; i++) {
    img = new Image();
    img.src = imgArray[i];
    appendImg(img);
  }
}

function appendImg(img) {
  img.classList.add('img-hidden');
  imgCarousel.appendChild(img);
}

function startCarousel() {
  
}

carouselController();