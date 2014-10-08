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
var exclusions = require('./words');

module.exports = function(keywords, options) {
  var opts = _.extend({sanitize: true}, options);

  if (opts.sanitize === true) {
    keywords = uniq(sanitize(keywords));
  }

  keywords = keywords.concat(opts.add || []);
  var keys = unique(keywords.slice());
  var omit = exclude(opts.omit);

  keywords = _.difference(keys, omit)
    .map(changeCase)
    .filter(Boolean);

  return _.union(keywords, chop(keywords))
    .sort();
};


/**
 * Clone the array and split words by dashes,
 * then concat the results back into the array
 *
 * @param  {Array} keywords
 * @return {Array}
 */

function chop(keywords) {
 return keywords.slice(0)
  .reduce(function(acc, ele) {
    acc = acc.concat(ele.split('-'));
    return acc;
  }, []);
}

/**
 * Get an array of the 100 most common english words
 */

function exclude(arr) {
  var words = exclusions.common;
  return words.concat(arr || []);
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
  str = String(str);
  str = str.replace(/_/g, '-')
  str = str.replace(/([A-Z]+)/g, function (_, $1) {
      return '-' + $1.toLowerCase();
    })
  str = str.replace(/[^a-z-]+/g, '-')
  str = str.replace(/^[-\s]+|[-\s]+$/g, '');
  return str;
}


/**
 * Clean up empty values, sentences, and non-word characters
 * that shouldn't polute the keywords.
 *
 * @param  {Array} `arr`
 * @return {Array}
 */

function sanitize(arr) {
  return _.reduce(arr, function(acc, keywords) {
    return acc.concat(keywords.split(' ')
      .filter(Boolean)).map(function(keyword) {
        return keyword.toLowerCase();
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
    var letter = exclusions.singleLetters;

    if (acc.indexOf(ele) === -1 && letter.indexOf(ele) === -1) {
      acc.push(ele);
    }
    return acc;
  }, []);
}

