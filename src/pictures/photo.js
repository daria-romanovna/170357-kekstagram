'use strict';

var getPicturesElement = require('./getPicturesElement');
var Gallery = require('../gallery');
var galleryContainer = document.querySelector('.gallery-overlay');
var variables = require('../variables');

var Photo = function(data, container) {
  this.data = data;

  this.element = getPicturesElement(this.data, container);

  this.onPhotoClick = function() {
    container.addEventListener('click', function(evt) {
      if (evt.target.classList.contains('picture-image')) {
        var index = Array.prototype.indexOf.call(container.children, evt.target.parentNode);
        var photoURL = '#photo/photos/' + (index + 1) + '.jpg';
        console.log(photoURL);
        window.location.hash = location.hash.photoURL;
      }
    });
  }.bind(this);

  this.remove = function() {
    this.element.removeEventListener('click', this.onPhotoClick);
    this.element.parentNode.removeChild(this.element);
  };

  this.element.addEventListener('click', this.onPhotoClick.bind(this));

  container.appendChild(this.element);
};

module.exports = Photo;

