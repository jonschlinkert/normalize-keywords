'use strict';

var words = require('common-words');
var _ = require('lodash');

/**
 * Get an array of the 100 most common english words
 */

function common(words) {
  return _.map(words, function(o) {
    return o.word.toLowerCase();
  }).sort();
}

/**
 * Some common words are excluded, like "the", "an"
 * etc. This is a list of words that we'll exlude
 * from the exclusions.
 */

var reallow = [
  'all',
  'any',
  'day',
  'do',
  'even',
  'first',
  'get',
  'have',
  'how',
  'in',
  'into',
  'just',
  'know',
  'like',
  'look',
  'make',
  'most',
  'new',
  'no',
  'not',
  'now',
  'on',
  'one',
  'only',
  'or',
  'other',
  'out',
  'over',
  'people',
  'say',
  'see',
  'some',
  'take',
  'then',
  'think',
  'time',
  'two',
  'up',
  'use',
  'well',
  'what',
  'when',
  'which',
  'who',
  'year',
];

/**
 * Exlude common words
 */

exports.common = _.difference(common(words), reallow);

/**
 * Exclude single letters from keywords.
 */

exports.singleLetters = 'abcdefghijklmnopqrstuvwxzy'.split('');
