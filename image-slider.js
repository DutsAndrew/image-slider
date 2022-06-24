let imgArray = [
  'imgs/cat-1.jpg',
  'imgs/cat-2.jpg',
  'imgs/cat-3.jpg',
  'imgs/cat-4.jpg',
  'imgs/cat-5.jpg',
];

const imgCarousel = document.getElementById('image-carousel');
const navBar = document.getElementById('nav-bar');
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
  let currentIcon = document.querySelector('.svg-icon-selected');
  let previousIcon = currentIcon.previousSibling;
  let nextIcon = currentIcon.nextSibling;

  if (previousImg == null || previousIcon == null) {
    previousImg = imgCarousel.lastChild;
    previousIcon = navBar.lastChild;
  } else if (nextImg == null || nextIcon == null) {
    nextImg = imgCarousel.firstChild;
    nextIcon = navBar.firstChild;
  }

  if (selectedArrow == 'image-slider-arrow-right') {
    currentImg.classList.remove('img-displayed');
    currentImg.classList.add('img-hidden');
    nextImg.classList.remove('img-hidden');
    nextImg.classList.add('img-displayed');
    currentIcon.classList.remove('svg-icon-selected');
    currentIcon.classList.add('svg-icon');
    nextIcon.classList.remove('svg-icon');
    nextIcon.classList.add('svg-icon-selected');
  } else if (selectedArrow == 'image-slider-arrow-left') {
    currentImg.classList.remove('img-displayed');
    currentImg.classList.add('img-hidden');
    previousImg.classList.remove('img-hidden');
    previousImg.classList.add('img-displayed');
    currentIcon.classList.remove('svg-icon-selected');
    currentIcon.classList.add('svg-icon');
    previousIcon.classList.remove('svg-icon');
    previousIcon.classList.add('svg-icon-selected');
  }
}

// Handles click events on navbar svgs
function changeImage(e) {
  let targetSvg = e.target;
  let targetSvgId = e.target.id;
  let targetSvgIndex = targetSvgId.slice(-1);

  removeDisplayedSvg();
  changeImgAndSvg(targetSvg, targetSvgIndex);
}

function removeDisplayedSvg() {
  let svgs = navBar.childNodes;
  for (let i = 0; i < svgs.length; i++) {
    let svg = svgs[i];
    if (svg.classList.contains('svg-icon-selected')) {
      svg.classList.remove('svg-icon-selected');
      svg.classList.add('svg-icon');
    }
  }
}

function changeImgAndSvg(targetSvg, targetSvgIndex) {
  let imgs = imgCarousel.childNodes;
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    let imgId = imgs[i].id;
    let imgIdIndex = imgId.slice(-1);

    if (img.classList.contains('img-displayed')) {
      img.classList.remove('img-displayed');
      img.classList.add('img-hidden');
    }

    if (imgIdIndex == targetSvgIndex) {
      img.classList.add('img-displayed')
      img.classList.remove('img-hidden');
      targetSvg.classList.add('svg-icon-selected');
      targetSvg.classList.remove('svg-icon');
    }
  }
}

// automatically rotates through and displays imgs
function carouselController() {
  createImgLibrary();
  displayFirstImg();
}

function createImgLibrary() {
  let img;
  let imgSvg;
  for (let i = 0; i < imgArray.length; i++) {
    img = new Image();
    img.src = imgArray[i];
    img.setAttribute('id', `img-${imgArray.indexOf(imgArray[i])}`);
    imgSvg = new Image();
    imgSvg.src = 'svgs/dot.svg';
    imgSvg.setAttribute('id', `svg-${imgArray.indexOf(imgArray[i])}`);
    imgSvg.classList.add('svg-icon');
    imgSvg.addEventListener('click', changeImage)
    appendImg(img, imgSvg);
  }
}

function appendImg(img, imgSvg) {
  img.classList.add('img-hidden');
  imgCarousel.appendChild(img);
  navBar.appendChild(imgSvg);
}

function displayFirstImg() {
  imgCarousel.childNodes[0].classList.remove('img-hidden');
  imgCarousel.childNodes[0].classList.add('img-displayed');
  navBar.childNodes[0].classList.remove('svg-icon');
  navBar.childNodes[0].classList.add('svg-icon-selected');
}

function startCarousel() {
  let selectedImg = document.querySelector('.img-displayed');
  let nextImg = selectedImg.nextSibling;
  let selectedIcon = document.querySelector('.svg-icon-selected');
  let nextIcon = selectedIcon.nextSibling;

  if (selectedImg == null
    || nextImg == null
    || selectedIcon == null
    || nextIcon == null
    ) {
      imgCarousel.lastChild.classList.remove('img-displayed');
      imgCarousel.lastChild.classList.add('img-hidden');
      imgCarousel.firstChild.classList.add('img-displayed');
      imgCarousel.firstChild.classList.remove('img-hidden');
      navBar.lastChild.classList.remove('svg-icon-selected');
      navBar.lastChild.classList.add('svg-icon');
      navBar.firstChild.classList.add('svg-icon-selected');
      navBar.firstChild.classList.remove('svg-icon');
  } else {
    selectedImg.classList.remove('img-displayed');
    selectedImg.classList.add('img-hidden');
    selectedIcon.classList.remove('svg-icon-selected');
    selectedIcon.classList.add('svg-icon');

    nextImg.classList.remove('img-hidden');
    nextImg.classList.add('img-displayed');
    nextIcon.classList.remove('svg-icon');
    nextIcon.classList.add('svg-icon-selected');
  }
}

carouselController();
setInterval(startCarousel, 5000);