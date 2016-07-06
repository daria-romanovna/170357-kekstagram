'use strict';

var Gallery = function(data, container) {
  this.data = data;
  this.showGallery = function(index) {
    var galleryImage = container.querySelector('.gallery-overlay-image');
    container.classList.remove('invisible');
    var picturetoShow = this.data[index].data;
    this.showPicture(picturetoShow);

    var _onPhotoClick = function() {
      picturetoShow = this.data[index++].data;
      this.showPicture(picturetoShow);
    }.bind(this);

    galleryImage.addEventListener('click', _onPhotoClick);
    this.hideGalleryonEvent();
  };

  this.showPicture = function(picturetoShow) {
    container.querySelector('.gallery-overlay-image').src = picturetoShow.url;
    container.querySelector('.comments-count').textContent = picturetoShow.comments;
    container.querySelector('.likes-count').textContent = picturetoShow.likes;
  };

  this._hideGallery = function() {
    container.classList.add('invisible');
  };

  this._hideonOverlayClick = function(evt) {
    if (evt.target.classList.contains('gallery-overlay')) {
      this._hideGallery();
    }
  };

  this._onDocumentKeyDown = function(evt) {
    if (evt.keyCode === 27) {
      this._hideGallery();
    }
  };

  this.hideGalleryonEvent = function() {
    var galleryClose = container.querySelector('.gallery-overlay-close');
    window.addEventListener('keydown', this._onDocumentKeyDown.bind(this));
    galleryClose.addEventListener('click', this._hideGallery.bind(this));
    container.addEventListener('click', this._hideonOverlayClick.bind(this));

    if (container.classList.contains('invisible')) {
      window.removeEventListener('keydown', this._onDocumentKeyDown.bind(this));
      galleryClose.removeEventListener('click', this._hideGallery.bind(this));
      container.removeEventListener('click', this._hideonOverlayClick.bind(this));
    }

  };

};

module.exports = Gallery;
