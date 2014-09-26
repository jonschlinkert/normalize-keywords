/*!
 * normalize-keywords <https://github.com/jonschlinkert/normalize-keywords>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var diff = require('arr-diff');
var unique = require('unique-words');
var reduce = require('reduce-object');
var words = require('common-words');


module.exports = function(keywords, options) {
  var opts = options || {};

  function common(arr) {
    return reduce(words, function(acc, o) {
      acc.push(o.word);
      return acc;
    }, arr || []);
  }

  keywords = keywords.concat(opts.add || []);
  var keys = unique(keywords.slice());
  var omit = common(opts.omit);

  return diff(keys, omit)
    .filter(Boolean)
    .sort();
};
