'use strict';

var getPicturesElement = require('./getPicturesElement');
var gallery = require('../gallery');

var Photo = function(data, container) {
  this.data = data;

  this.element = getPicturesElement(this.data, container);

  this.onPhotoClick = function() {
    container.addEventListener('click', function(evt) {
      if (evt.target.classList.contains('picture-image')) {
        var index = Array.prototype.indexOf.call(container.children, evt.target.parentNode);
        gallery.showGallery(index);
      }
    });
  };

  this.remove = function() {
    this.element.removeEventListener('click', this.onPhotoClick);
    this.element.parentNode.removeChild(this.element);
  };

  this.element.addEventListener('click', this.onPhotoClick);

  container.appendChild(this.element);
};

module.exports = Photo;

