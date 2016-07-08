'use strict';


var Gallery = function(data, container) {
  var galleryImage = container.querySelector('.gallery-overlay-image');
  this.data = data;
  this.showGallery = function(index) {
    container.classList.remove('invisible');
    var picturetoShow = this.data[index].data;
    this.showPicture(picturetoShow);

    var _onPhotoClick = function() {
      if (index <= this.data.length) {
        picturetoShow = this.data[++index].data;
        this.showPicture(picturetoShow);
      }
    }.bind(this);

    galleryImage.addEventListener('click', _onPhotoClick);
    this.hideGalleryonEvent();
  };

  this.showPicture = function(picturetoShow) {
    galleryImage.src = picturetoShow.url;
    container.querySelector('.comments-count').textContent = picturetoShow.comments;
    container.querySelector('.likes-count').textContent = picturetoShow.likes;
  };

  this._hideGallery = function() {
    container.classList.add('invisible');
  };

  this._hideonOverlayClick = function(evt) {
    if (evt.target.classList.contains('gallery-overlay')) {
      container.classList.add('invisible');
    }
  };

  this._onDocumentKeyDown = function(evt) {
    if (evt.keyCode === 27) {
      container.classList.add('invisible');
    }
  };

  this.hideGalleryonEvent = function() {
    var galleryClose = container.querySelector('.gallery-overlay-close');
    window.addEventListener('keydown', this._onDocumentKeyDown);
    galleryClose.addEventListener('click', this._hideGallery);
    container.addEventListener('click', this._hideonOverlayClick);

    if (container.classList.contains('invisible')) {
      window.removeEventListener('keydown', this._onDocumentKeyDown);
      galleryClose.removeEventListener('click', this._hideGallery);
      container.removeEventListener('click', this._hideonOverlayClick);
      galleryImage.removeEventListener('click', this._onPhotoClick);
    }

  };

};

module.exports = Gallery;
