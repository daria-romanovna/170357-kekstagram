'use strict';

var variables = require('./variables');
var utilities = require('./utilities');
var getPictures = require('./pictures/getPictures');
var getPicturesElement = require('./pictures/getPicturesElement');
var filterFunction = require('./filter/filterFunction');
var filterType = require('./filter/filterType');
var gallery = require('./gallery');

var DEFAULT_FILTER = filterType.ALL;
var PAGE_SIZE = 12;
var pageNumber;

utilities.hideBlock(variables.filtersBlock);

var renderPictures = function(picturestoRender, page, replace) {
  if (replace) {
    variables.picturesContainer.innerHTML = '';
  }

  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;

  picturestoRender.slice(from, to).forEach(function(picture) {
    getPicturesElement(picture, variables.picturesContainer);
  });
};

var setFilterEnabled = function(filter) {
  variables.filteredPictures = filterFunction(filter);
  gallery.getGalleryPictures(variables.filteredPictures);
  pageNumber = 0;
  renderPictures(variables.filteredPictures, pageNumber, true);

  if (utilities.isPageBottomReached(variables.picturesContainer) &&
  utilities.isNextPageAvailable(variables.pictures, pageNumber, PAGE_SIZE)) {
    pageNumber++;
    renderPictures(variables.filteredPictures, pageNumber);
  }

};

var setFiltrationEnabled = function() {
  variables.filtersBlock.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('filters-radio')) {
      variables.picturesContainer.classList.remove('pictures-null');
      setFilterEnabled(evt.target.id);
    }
  });
};

var THROTTLE_DELAY = 100;

var setScrollEnabled = function() {
  var lastCall = Date.now();

  window.addEventListener('scroll', function() {
    if (Date.now() - lastCall >= THROTTLE_DELAY) {
      if (utilities.isBottomReached(variables.picturesContainer) &&
          utilities.isNextPageAvailable(variables.pictures, pageNumber, PAGE_SIZE)) {
        pageNumber++;
        renderPictures(variables.filteredPictures, pageNumber);
      }
      lastCall = Date.now();
    }
  });
};

getPictures(function(loadedPictures) {
  variables.pictures = loadedPictures;
  utilities.showBlock(variables.filtersBlock);
  setFilterEnabled(DEFAULT_FILTER);
  setFiltrationEnabled();
  setScrollEnabled();
  showGalleryonClick();
});

var showGalleryonClick = function() {
  variables.picturesContainer.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('picture-image')) {
      var index = Array.prototype.indexOf.call(variables.picturesContainer.children, evt.target.parentNode);
      gallery.showGallery(index);
    }
  });
};

