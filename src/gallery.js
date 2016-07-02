'use strict';

var galleryContainer = document.querySelector('.gallery-overlay');
var galleryPictures = [];
var galleryClose = document.querySelector('.gallery-overlay-close');
var galleryImage = document.querySelector('.gallery-overlay-image');

var getGalleryPictures = function(picturestoShow) {
  galleryPictures = picturestoShow;
};

var showGallery = function(index) {
  galleryContainer.classList.remove('invisible');
  var picturetoShow = galleryPictures[index];
  showPicture(picturetoShow);

  galleryImage.addEventListener('click', function() {
    picturetoShow = galleryPictures[index++];
    showPicture(picturetoShow);
  });

  window.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
      hideGallery();
    }
  });

  hideGalleryonEvent();

};

var showPicture = function(picturetoShow) {
  galleryContainer.querySelector('.gallery-overlay-image').src = picturetoShow.url;
  galleryContainer.querySelector('.comments-count').textContent = picturetoShow.comments;
  galleryContainer.querySelector('.likes-count').textContent = picturetoShow.likes;
};


var hideGallery = function() {
  galleryContainer.classList.add('invisible');
};

var hideGalleryonEvent = function() {

  var hideonOverlayClick = function(evt) {
    if (evt.target.classList.contains('gallery-overlay')) {
      hideGallery();
    }
  };

  galleryClose.addEventListener('click', hideGallery);

  galleryContainer.addEventListener('click', hideonOverlayClick, false);

  if (galleryContainer.classList.contains('invisible')) {
    galleryClose.removeEventListener('click', hideGallery);
    galleryContainer.removeEventListener('click', hideonOverlayClick);
  }

};

module.exports = {
  showGallery: showGallery,
  getGalleryPictures: getGalleryPictures
};
