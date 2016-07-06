'use strict';

var getPicturesElement = require('./getPicturesElement');
var Gallery = require('../gallery');
var galleryContainer = document.querySelector('.gallery-overlay');
var variables = require('../variables');

document.addEventListener('load', function() {
  var matches = window.location.hash.match(/#photos\/(\S+)/);
  if (matches) {
    var gallery = new Gallery(variables.renderedPictures, galleryContainer);
    gallery.showGallery(matches[1]);
  } else {
    gallery.hideGallery();
  }
});

window.addEventListener('hashchange', function() {
  var matches = window.location.hash.match(/#photos\/(\S+)/);
  if (matches) {
    var gallery = new Gallery(variables.renderedPictures, galleryContainer);
    gallery.showGallery(matches[1]);
  } else {
    gallery.hideGallery();
  }
});

var Photo = function(data, container) {
  this.data = data;

  this.element = getPicturesElement(this.data, container);

  this.onPhotoClick = function() {
    container.addEventListener('click', function(evt) {
      if (evt.target.classList.contains('picture-image')) {
        var matches = evt.target.src.match(/photos\/(\S+)/);
        window.location.hash = matches[0];
      }
    });
  };

  this.remove = function() {
    this.element.removeEventListener('click', this.onPhotoClick);
    this.element.parentNode.removeChild(this.element);
  };

  this.element.addEventListener('click', this.onPhotoClick.bind(this));

  container.appendChild(this.element);
};

module.exports = Photo;

