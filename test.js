/*!
 * normalize-keywords <https://github.com/jonschlinkert/normalize-keywords>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var normalize = require('./');

describe('normalize', function () {
  it('should normalize keywords', function () {
    var keywords = ['foo', 'bar', 'foo bar quux', 'baz', 'foo bar fez baz', 'bar baz'];
    var expected = ['bar', 'baz', 'fez', 'foo', 'quux'];
    normalize(keywords).should.eql(expected);
  });

  it('should remove common words', function () {
    var keywords = ['foo', 'the bar', 'the foo be bar and quux', 'and one baz', 'foo for bar fez baz', 'bar baz'];
    var expected = ['bar', 'baz', 'fez', 'foo', 'one', 'quux'];
    normalize(keywords).should.eql(expected);
  });

  it('should remove user-defined words', function () {
    var keywords = ['foo', 'the bar', 'the foo be bar and quux', 'and one baz', 'foo for bar fez baz', 'bar baz'];
    normalize(keywords, {omit: ['foo', 'bar']}).should.eql(['baz', 'fez', 'one', 'quux']);
  });

  it('should make all words lowercase', function () {
    var keywords = ['Foo', 'foo'];
    normalize(keywords).should.eql(['foo']);
  });

  it('readme example', function () {
    var keywords = ['foo', 'the bar', 'the foo be bar and quux'];
    normalize(keywords, {omit: ['foo']}).should.eql(['bar', 'quux']);
  });
});