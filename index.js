/*!
 * normalize-keywords <https://github.com/jonschlinkert/normalize-keywords>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var _ = require('lodash');
var unique = require('unique-words');
var words = require('common-words');
var exclusions = require('./exclusions');


module.exports = function(keywords, options) {
  var opts = _.extend({sanitize: true}, options);

  if (opts.sanitize === true) {
    keywords = uniq(sanitize(keywords));
  }

  keywords = keywords.concat(opts.add || []);
  var keys = unique(keywords.slice());
  var omit = common(opts.omit);

  keywords = _.difference(keys, omit)
    .map(changeCase).filter(Boolean)

  // Clone the array and split words by dashes,
  // then concat the results back into the array
  var res = keywords.slice(0)
    .reduce(function(acc, ele) {
      acc = acc.concat(ele.split('-'));
      return acc;
    }, []);

  return _.union(keywords, res)
    .sort();
};


/**
 * Get an array of the 100 most common english words
 */

function common(arr) {
  return _.reduce(words, function(acc, o) {
    return acc.concat(o.word.toLowerCase());
  }, arr || []).sort();
}


/**
 * Convert camelcase to slugs, remove leading and trailing
 * dashes and whitespace. Convert underscores to dashes.
 *
 * @param  {String} `str`
 * @return {String}
 */

function changeCase(str) {
  if (str == null) return '';

  return String(str)
    .replace(/_/g, '-')
    .replace(/([A-Z]+)/g, function (_, $1) {
      return '-' + $1.toLowerCase();
    })
    .replace(/[^a-z-]+/g, '-')
    .replace(/^[-\s]+|[-\s]+$/g, '');
}


/**
 * Clean up empty values, sentences, and non-word characters
 * that shouldn't polute the keywords.
 *
 * @param  {Array} `arr`
 * @return {Array}
 */

function sanitize(arr) {
  return _.reduce(arr, function(acc, words) {
    return acc.concat(words.split(' ')
      .filter(Boolean)).map(function(word) {
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

  return _.reduce(arr, function(acc, ele) {
    if (acc.indexOf(ele) === -1 && exclusions.indexOf(ele) === -1) {
      acc.push(ele);
    }
    return acc;
  }, []);
}

