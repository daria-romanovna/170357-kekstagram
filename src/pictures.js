'use strict';

var filtersBlock = document.querySelector('.filters');
var picturesContainer = document.querySelector('.pictures');
var templateElement = document.querySelector('template');
var elementToClone;

if ('content' in templateElement) {
  var elementToClone = templateElement.content.querySelector('.picture');
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
    element.qetElementsbyTagName('img').src = evt.target.src;
    element.qetElementsbyTagName('img').width = '182';
    element.qetElementsbyTagName('img').height = '182';
  };

  pictureImage.onerror = function() {
    element.classList.add('picture-load-failure');
  };

  pictureImage.src = data.url;

  var pictureLoadTimeout = setTimeout(function() {
    pictureImage.src = '';
    element.classList.add('picture-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  return element;
};

hidefiltersBlock();
pictures.forEach(function(picture) {
  getPicturesElement(picture, picturesContainer);
  showfiltersBlock();
});
