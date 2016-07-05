'use strict';

var IMAGE_LOAD_TIMEOUT = 1000;

var getPicturesElement = function(data, container) {
  var templateElement = document.querySelector('template');
  var elementToClone;

  if ('content' in templateElement) {
    elementToClone = templateElement.content.querySelector('.picture');
  } else {
    elementToClone = templateElement.querySelector('.picture');
  }

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
  }, IMAGE_LOAD_TIMEOUT);

  return element;

};

module.exports = getPicturesElement;



