'use strict';

var filtersBlock = document.querySelector('.filters');
var picturesContainer = document.querySelector('.pictures');
var templateElement = document.querySelector('template');
var elementToClone;
var pictures = [];

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.picture');
} else {
  elementToClone = templateElement.querySelector('.picture');
}

var IMAGE_LOAD_TIMEOUT = 10000;

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

var PICTURES_LOAD_URL = '//o0.github.io/assets/json/pictures.json'

var getPictures = function(callback) {
  picturesContainer.classList.add('pictures-loading');

  var xhr = new XMLHttpRequest();

  xhr.onload = function(evt) {
    picturesContainer.classList.remove('pictures-loading');
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
  };

  xhr.onerror = function(evt) {
    picturesContainer.classList.remove('pictures-loading');
    picturesContainer.classList.add('pictures-failure');
  };

  xhr.timeout = 5000;

  xhr.ontimeout = function(evt) {
    picturesContainer.classList.remove('pictures-loading');
    picturesContainer.classList.add('pictures-failure');
  };

  xhr.open('GET', PICTURES_LOAD_URL);
  xhr.send();
};

var renderPictures = function(picturesToRender) {
  picturesContainer.innerHTML = '';
  picturesToRender.forEach(function(picture) {
    getPicturesElement(picture, picturesContainer);
  });
}

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
      var daysAgo = 4;
      var fourDaysAgo = new Date(currentDate.getTime() - (daysAgo * 24 * 60 * 60 * 1000));

      var newPictures = picturesToFilter.filter(function(picture, i, arr) {
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
      break;
  }

  return picturesToFilter;
};

var setFilterEnabled = function(filter) {
  var filteredPictures = getFilteredPictures(filter);
  renderPictures(filteredPictures);
};

var setFiltrationEnabled = function() {
  var filters = filtersBlock.querySelectorAll('.filters-radio');
  for (var i = 0; i < filters.length; i++) {
    filters[i].onclick = function(evt) {
      picturesContainer.classList.remove('pictures-null');
      setFilterEnabled(this.id);
    };
  }
};

getPictures(function(loadedPictures) {
  pictures = loadedPictures;
  showfiltersBlock();
  setFilterEnabled(DEFAULT_FILTER);
  setFiltrationEnabled();
});




