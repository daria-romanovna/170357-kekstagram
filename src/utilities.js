'use strict';

var isBottomReached = function(container) {
  var GAP = 100;
  var currentPosition = container.getBoundingClientRect();
  return currentPosition.height - window.pageYOffset - window.innerHeight <= GAP;
};

var isPageBottomReached = function(container) {
  var GAP = 50;
  var currentPosition = container.getBoundingClientRect();
  return window.innerHeight - currentPosition.bottom >= GAP;
};

var isNextPageAvailable = function(picturestoRender, page, pageSize) {
  return page < Math.floor(picturestoRender.length / pageSize);
};

var hideBlock = function(block) {
  if (!block.classList.contains('hidden')) {
    block.classList.add('hidden');
  }
};

var showBlock = function(block) {
  if (block.classList.contains('hidden')) {
    block.classList.remove('hidden');
  }
};

module.exports = {
  isBottomReached: isBottomReached,
  isPageBottomReached: isPageBottomReached,
  isNextPageAvailable: isNextPageAvailable,
  hideBlock: hideBlock,
  showBlock: showBlock
};
