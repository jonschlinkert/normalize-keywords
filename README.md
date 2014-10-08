# normalize-keywords [![NPM version](https://badge.fury.io/js/normalize-keywords.svg)](http://badge.fury.io/js/normalize-keywords)


> Normalize an array of keywords. Sorts and removes duplicates and common words (uses the 100 most common english words).

## Install
#### Install with [npm](npmjs.org):

```bash
npm i normalize-keywords --save-dev
```

## Run tests

```bash
npm test
```

## Usage

```js
var normalize = require('normalize-keywords');
var keywords = ['foo', 'the bar', 'the foo be bar and quux'];

normalize(keywords);
//=> ['bar', 'foo', 'quux']

normalize(keywords, {omit: ['foo']});
//=> ['bar', 'quux']
```
## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014 Jon Schlinkert, contributors.  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on October 07, 2014._