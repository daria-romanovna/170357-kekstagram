'use strict';

var filtersBlock = document.querySelector('.filters');
var picturesContainer = document.querySelector('.pictures');
var templateElement = document.querySelector('template');
var elementToClone;
var pictures = [];
var PAGE_SIZE = 12;
var pageNumber = 0;
var filteredPictures = [];
var PICTURES_LOAD_URL = 'https://o0.github.io/assets/json/pictures.json';
var IMAGE_LOAD_TIMEOUT = 10000;

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.picture');
} else {
  elementToClone = templateElement.querySelector('.picture');
}

var Filter = {
  'ALL': 'filter-popular',
  'NEW': 'filter-new',
  'DISCUSSED': 'filter-discussed'
};

var DEFAULT_FILTER = Filter.ALL;

function hidefiltersBlock() {
  if (!filtersBlock.classList.contains('hidden')) {
    filtersBlock.classList.add('hidden');
  }
}

function showfiltersBlock() {
  if (filtersBlock.classList.contains('hidden')) {
    filtersBlock.classList.remove('hidden');
  }
}

var getPicturesElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.picture-comments').textContent = data.comments;
  element.querySelector('.picture-likes').textContent = data.likes;
  container.appendChild(element);

  var pictureImage = new Image();
  pictureImage.onload = function(evt) {
    clearTimeout(pictureLoadTimeout);
    element.querySelector('.picture-image').src = evt.target.src;
    element.querySelector('.picture-image').width = '182';
    element.querySelector('.picture-image').height = '182';
  };

  pictureImage.onerror = function() {
    element.classList.add('picture-load-failure');
  };

  pictureImage.src = data.url;

  var pictureLoadTimeout = setTimeout(function() {
    pictureImage.src = '';
    element.classList.add('picture-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

};

hidefiltersBlock();

var getPictures = function(callback) {
  picturesContainer.classList.add('pictures-loading');

  var xhr = new XMLHttpRequest();

  xhr.onload = function(evt) {
    picturesContainer.classList.remove('pictures-loading');
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
  };

  xhr.onerror = function() {
    picturesContainer.classList.remove('pictures-loading');
    picturesContainer.classList.add('pictures-failure');
  };

  xhr.timeout = 5000;

  xhr.ontimeout = function() {
    picturesContainer.classList.remove('pictures-loading');
    picturesContainer.classList.add('pictures-failure');
  };

  xhr.open('GET', PICTURES_LOAD_URL);
  xhr.send();
};

var renderPictures = function( picturestoRender, page, replace) {
  if (replace) {
    picturesContainer.innerHTML = '';
  }

  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;

  picturestoRender.slice(from, to).forEach(function(picture) {
    getPicturesElement(picture, picturesContainer);
  });
};

var getFilteredPictures = function(filter) {
  var picturesToFilter = pictures.slice(0);

  switch (filter) {
    case Filter.DISCUSSED:
      picturesToFilter.sort(function(a, b) {
        return b.comments - a.comments;
      });
      break;

    case Filter.NEW:
      var currentDate = new Date();
      var fourDaysAgo = currentDate.setDate(currentDate.getDate() - 4);

      var newPictures = picturesToFilter.filter(function(picture) {
        var pictureDate = new Date(picture.date);
        var shouldRemainInArray = pictureDate > fourDaysAgo;
        return shouldRemainInArray;
      });

      newPictures.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
      });

      if (newPictures.length === 0) {
        picturesContainer.classList.add('pictures-null');
      }

      return newPictures;
  }

  return picturesToFilter;
};

var setFilterEnabled = function(filter) {
  filteredPictures = getFilteredPictures(filter);
  pageNumber = 0;
  renderPictures(filteredPictures, pageNumber, true);
};

var setFiltrationEnabled = function() {
  filtersBlock.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('filters-radio')) {
      picturesContainer.classList.remove('pictures-null');
      setFilterEnabled(evt.target.id);
    }
  });
};

var isBottomReached = function() {
  var picturesPosition = picturesContainer.getBoundingClientRect();
  return picturesPosition.height - window.pageYOffset - 700 <= 0;
};

var isNextPageAvailable = function(picturestoRender, page) {
  return page < Math.floor(picturestoRender.length / PAGE_SIZE);
};

var THROTTLE_DELAY = 100;

var setScrollEnabled = function() {
  var lastCall = Date.now();

  window.addEventListener('scroll', function() {
    if (Date.now() - lastCall >= THROTTLE_DELAY) {
      console.log('123');
      if (isBottomReached() &&
          isNextPageAvailable(pictures, pageNumber)) {
        pageNumber++;
        renderPictures(filteredPictures, pageNumber);
      }

      lastCall = Date.now();

    }

  });
};

getPictures(function(loadedPictures) {
  pictures = loadedPictures;
  showfiltersBlock();
  setFilterEnabled(DEFAULT_FILTER);
  setFiltrationEnabled();
  setScrollEnabled();
});




