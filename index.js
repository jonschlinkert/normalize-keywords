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
var sentence = require('sentence-case');
var exclusions = require('./exclusions');


module.exports = function(keywords, options) {
  var opts = options || {sanitize: true};

  if (opts.sanitize === true) {
    keywords = uniq(sanitize(keywords));
  }

  keywords = keywords.concat(opts.add || []);
  var keys = unique(keywords.slice());
  var omit = common(opts.omit);

  return diff(keys, omit)
    .filter(Boolean)
    .sort();
};


/**
 * Get an array of the 100 most common english words
 */

function common(arr) {
  return reduce(words, function(acc, o) {
    return acc.concat(o.word.toLowerCase());
  }, arr || []).sort();
}


/**
 * Clean up empty values, sentences, and non-word characters
 * that shouldn't polute the keywords.
 *
 * @param  {Array} `arr`
 * @return {Array}
 */

function sanitize(arr) {
  return arr.reduce(function(acc, words) {
    return acc.concat(sentence(words)
      .split(' ').filter(Boolean))
      .map(function(word) {
        return word.toLowerCase();
      }).sort();
  }, []);
}


/**
 * Uniqueify keywords.
 *
 * @param  {Array} `arr`
 * @return {Array}
 */

function uniq(arr) {
  if (arr == null || arr.length === 0) {
    return [];
  }

  return reduce(arr, function(acc, ele) {
    if (acc.indexOf(ele) === -1 && exclusions.indexOf(ele) === -1) {
      acc.push(ele);
    }
    return acc;
  }, []);
}

