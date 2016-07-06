'use strict';

var getPicturesElement = require('./getPicturesElement');
var Gallery = require('../gallery');
var galleryContainer = document.querySelector('.gallery-overlay');
var variables = require('../variables');

document.addEventListener('load', function() {
  var matches = window.location.hash.match(/#photos\/(\S+)/);
  var gallery = new Gallery(variables.renderedPictures, galleryContainer);
  if (matches) {
    gallery.showGallery(matches[1]);
  } else {
    gallery._hideGallery();
  }
});

window.addEventListener('hashchange', function() {
  var matches = window.location.hash.match(/#photos\/(\S+)/);
  var gallery = new Gallery(variables.renderedPictures, galleryContainer);
  if (matches) {
    gallery.showGallery(matches[1]);
  } else {
    gallery._hideGallery();
  }
});

var Photo = function(data, container) {
  this.container = container;
  this.data = data;
  this.element = getPicturesElement(this.data, this.container);
  this.element.addEventListener('click', this.onPhotoClick.bind(this));
  container.appendChild(this.element);
};

module.exports = Photo;

Photo.prototype.onPhotoClick = function() {
  this.container.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('picture-image')) {
      var matches = evt.target.src.match(/photos\/(\S+)/);
      window.location.hash = matches[0];
    }
  });
};

Photo.prototype.remove = function() {
  this.element.removeEventListener('click', this.onPhotoClick);
  this.element.parentNode.removeChild(this.element);
};

