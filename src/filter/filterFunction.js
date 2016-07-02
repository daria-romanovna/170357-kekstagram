'use strict';

var filterType = require('./filterType');
var variables = require('../variables');

var filterFunction = function(filter) {
  var picturesToFilter = variables.pictures.slice(0);

  switch (filter) {
    case filterType.DISCUSSED:
      picturesToFilter.sort(function(a, b) {
        return b.comments - a.comments;
      });
      break;

    case filterType.NEW:
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
        variables.picturesContainer.classList.add('pictures-null');
      }

      return newPictures;
  }

  return picturesToFilter;
};

module.exports = filterFunction;
