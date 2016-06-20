'use strict';

var filtersBlock = document.querySelector('.filters');
var picturesContainer = document.querySelector('.pictures');
var templateElement = document.querySelector('template');
var elementToClone;

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.picture');
} else {
  elementToClone = templateElement.querySelector('.picture');
}

var IMAGE_LOAD_TIMEOUT = 10000;

function hidefiltersBlock() {
  if (!filtersBlock.classList.contains('hidden')) {
    filtersBlock.classList.add('hidden');
  }
}

function showfiltersBlock() {
  if (filtersBlock.classList.contains('hidden')) {
    filtersBlock.classList.remove('hidden');
  }
}

var getPicturesElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.picture-comments').textContent = data.comments;
  element.querySelector('.picture-likes').textContent = data.likes;
  container.appendChild(element);

  var pictureImage = new Image();
  pictureImage.onload = function(evt) {
    clearTimeout(pictureLoadTimeout);
    element.querySelector('.picture-image').src = evt.target.src;
    element.querySelector('.picture-image').width = '182';
    element.querySelector('.picture-image').height = '182';
  };

  pictureImage.onerror = function() {
    element.classList.add('picture-load-failure');
  };

  pictureImage.src = data.url;

  var pictureLoadTimeout = setTimeout(function() {
    pictureImage.src = '';
    element.classList.add('picture-load-failure');
    hidefiltersBlock();
  }, IMAGE_LOAD_TIMEOUT);

};

hidefiltersBlock();
window.pictures.forEach(function(picture) {
  getPicturesElement(picture, picturesContainer);
  showfiltersBlock();
});
