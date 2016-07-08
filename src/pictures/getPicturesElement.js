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

  var _pictureOnLoad = function(evt) {
    clearTimeout(pictureLoadTimeout);
    var elementPicture = element.querySelector('.picture-image');
    elementPicture.src = evt.target.src;
    elementPicture.width = '182';
    elementPicture.height = '182';
    pictureImage.removeEventListener('error', _pictureOnError);
  };

  var _pictureOnError = function() {
    element.classList.add('picture-load-failure');
    pictureImage.removeEventListener('load', _pictureOnLoad);
  };

  pictureImage.addEventListener('load', _pictureOnLoad);
  pictureImage.addEventListener('error', _pictureOnError);

  pictureImage.src = data.url;

  var pictureLoadTimeout = setTimeout(function() {
    pictureImage.src = '';
    element.classList.add('picture-load-failure');
    pictureImage.removeEventListener('load', _pictureOnLoad);
  }, IMAGE_LOAD_TIMEOUT);

  return element;
};

module.exports = getPicturesElement;



