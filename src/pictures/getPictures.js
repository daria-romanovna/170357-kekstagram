'use strict';

var variables = require('../variables');
var PICTURES_LOAD_URL = 'https://o0.github.io/assets/json/pictures.json';

var getPictures = function(callback) {

  variables.picturesContainer.classList.add('pictures-loading');

  var xhr = new XMLHttpRequest();

  xhr.onload = function(evt) {
    variables.picturesContainer.classList.remove('pictures-loading');
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
  };

  xhr.onerror = function() {
    variables.picturesContainer.classList.remove('pictures-loading');
    variables.picturesContainer.classList.add('pictures-failure');
  };

  xhr.timeout = 5000;

  xhr.ontimeout = function() {
    variables.picturesContainer.classList.remove('pictures-loading');
    variables.picturesContainer.classList.add('pictures-failure');
  };

  xhr.open('GET', PICTURES_LOAD_URL);
  xhr.send();
};

module.exports = getPictures;
