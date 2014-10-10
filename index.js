/*!
 * normalize-keywords <https://github.com/jonschlinkert/normalize-keywords>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var unique = require('unique-words');
var words = require('common-words');
var inflection = require('inflection');
var exclusions = require('./words');
var _ = require('lodash');


module.exports = function(keywords, options) {
  var opts = _.extend({sanitize: true}, options);

  if (opts.sanitize === true) {
    keywords = uniq(sanitize(keywords));
  }

  keywords = keywords.concat(opts.add || []);
  var keys = unique(keywords.slice());

  return normalize(keys, opts);
};

/**
 * Normalize keywords,
 *
 * @param  {Array} keywords
 * @return {Array}
 */

function normalize(keywords, options) {
  var opts = _.extend({inflect: false}, options);

  keywords = _.union(keywords, chop(keywords));
  var omit = exclude(opts.omit);

  var res = keywords.map(function (keyword, i) {
    if (options && options.normalize) {
      return options.normalize(keywords, i, keywords);
    }
    return properize(keyword, options);
  }).sort();

  return _.uniq(_.difference(res, omit));
}

/**
 * Make the word lowercase, dashed, and singular.
 *
 * @param  {String} `word`
 * @return {String}
 */

function properize(word, options) {
  options = _.extend({inflect: false}, options);
  if (!/\./.test(word)) {
    word = changeCase(word);
    if (options.inflect === false) {
      return word;
    }
    return inflection.singularize(word);
  }
  return word;
}

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
 * Array of the 100 most common english words,
 * to exclude from the resulting keywords.
 *
 * @param  {Array} `omit` Add keywords to omit.
 * @return {Array}
 */

function exclude(omit) {
  var words = exclusions.common;
  return words.concat(omit || []);
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
  str = str.replace(/\./g, 'zzz')
  str = str.replace(/_/g, '-')
  str = str.replace(/([A-Z]+)/g, function (_, $1) {
    return '-' + $1.toLowerCase();
  });
  str = str.replace(/[^a-z-]+/g, '-')
  str = str.replace(/^[-\s]+|[-\s]+$/g, '');
  str = str.replace(/zzz/g, '.');
  return str;
}


/**
 * Clean up empty values, sentences, and non-word characters
 * that shouldn't polute the keywords.
 *
 * @param  {Array} `arr`
 * @return {Array}
 */

function sanitize(arr, opts) {
  return _.reduce(arr, function (acc, keywords) {
    keywords = keywords.split(' ').filter(Boolean);
    return acc.concat(keywords).map(function (keyword, i) {
      if (opts && opts.sanitize) {
        return opts.sanitize(keyword, i, keywords);
      }
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

