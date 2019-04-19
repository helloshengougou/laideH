//     Zepto.js
//     (c) 2010-2016 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

$.fn.prevAll = function (selector) {
  var prevEls = [];
  var el = this[0];
  if (!el) return $([]);
  while (el.previousElementSibling) {
    var prev = el.previousElementSibling;
    if (selector) {
      if ($(prev).is(selector)) prevEls.push(prev);
    } else prevEls.push(prev);
    el = prev;
  }
  return $(prevEls);
};

$.fn.nextAll = function (selector) {
  var nextEls = [];
  var el = this[0];
  if (!el) return $([]);
  while (el.nextElementSibling) {
    var next = el.nextElementSibling;
    if (selector) {
      if ($(next).is(selector)) nextEls.push(next);
    } else nextEls.push(next);
    el = next;
  }
  return $(nextEls);
};