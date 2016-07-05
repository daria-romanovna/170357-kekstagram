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

  var _onPhotoClick = function() {
    picturetoShow = galleryPictures[index++];
    showPicture(picturetoShow);
  };

  galleryImage.addEventListener('click', _onPhotoClick);

  hideGalleryonEvent();

};

var showPicture = function(picturetoShow) {
  galleryContainer.querySelector('.gallery-overlay-image').src = picturetoShow.url;
  galleryContainer.querySelector('.comments-count').textContent = picturetoShow.comments;
  galleryContainer.querySelector('.likes-count').textContent = picturetoShow.likes;
};

var _hideGallery = function() {
  galleryContainer.classList.add('invisible');
};

var _hideonOverlayClick = function(evt) {
  if (evt.target.classList.contains('gallery-overlay')) {
    hideGallery();
  }
};

var _onDocumentKeyDown = function(evt) {
  if (evt.keyCode === 27) {
    hideGallery();
  }
};

var hideGalleryonEvent = function() {

  window.addEventListener('keydown', _onDocumentKeyDown);
  galleryClose.addEventListener('click', _hideGallery);
  galleryContainer.addEventListener('click', _hideonOverlayClick);

  if (galleryContainer.classList.contains('invisible')) {
    window.removeEventListener('keydown', _onDocumentKeyDown);
    galleryClose.removeEventListener('click', _hideGallery);
    galleryContainer.removeEventListener('click', _hideonOverlayClick);
  }

};

module.exports = {
  showGallery: showGallery,
  getGalleryPictures: getGalleryPictures
};
