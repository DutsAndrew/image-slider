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

// rotates imgs based on arrow clicks
function rotateCarousel(e) {
  let selectedArrow = e.composedPath()[0].id;
  let currentImg = document.querySelector('.img-displayed');
  let previousImg = currentImg.previousSibling;
  let nextImg = currentImg.nextSibling;

  if (previousImg == null) {
    previousImg = imgCarousel.lastChild;
  } else if (nextImg == null) {
    nextImg = imgCarousel.firstChild;
  }

  if (selectedArrow == 'image-slider-arrow-right') {
    currentImg.classList.remove('img-displayed');
    currentImg.classList.add('img-hidden');
    nextImg.classList.remove('img-hidden');
    nextImg.classList.add('img-displayed');
  } else if (selectedArrow == 'image-slider-arrow-left') {
    currentImg.classList.remove('img-displayed');
    currentImg.classList.add('img-hidden');
    previousImg.classList.remove('img-hidden');
    previousImg.classList.add('img-displayed');
  }
}

// automatically rotates through and displays imgs
function carouselController() {
  createImgLibrary();
  displayFirstImg();
}

function createImgLibrary() {
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

function displayFirstImg() {
  imgCarousel.childNodes[0].classList.remove('img-hidden');
  imgCarousel.childNodes[0].classList.add('img-displayed');
}

function startCarousel() {
  let selectedImg = document.querySelector('.img-displayed');
  let nextImg = selectedImg.nextSibling;

  if (selectedImg == null || nextImg == null) {
    imgCarousel.lastChild.classList.remove('img-displayed');
    imgCarousel.lastChild.classList.add('img-hidden');
    imgCarousel.firstChild.classList.add('img-displayed');
    imgCarousel.firstChild.classList.remove('img-hidden');
  } else {
    selectedImg.classList.remove('img-displayed');
    selectedImg.classList.add('img-hidden');

    nextImg.classList.remove('img-hidden');
    nextImg.classList.add('img-displayed');
  }
}

carouselController();
setInterval(startCarousel, 5000);