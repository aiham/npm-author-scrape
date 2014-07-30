# npm-author-scrape

[![NPM version](https://badge.fury.io/js/npm-author-scrape.svg)](http://badge.fury.io/js/npm-author-scrape) [![Travis-CI](https://travis-ci.org/aiham/npm-author-scrape.svg?branch=master)](https://travis-ci.org/aiham/npm-author-scrape)

npm-author-scrape is a Javascript module to extract data from an NPM author's profile page.

## Requirements

- [Node.js][]
- [request][]
- [jq-html-parser][]
- [mocha][] (To run tests)

[Node.js]: http://nodejs.org/
[request]: https://github.com/mikeal/request
[jq-html-parser]: https://github.com/jpstevens/jq-html-parser
[mocha]: http://visionmedia.github.io/mocha/

## Installation

```sh
npm install npm-author-scrape
```

## Run Tests

```sh
npm test
```

## Usage

```js
var scrape = require('npm-author-scrape');

scrape('aiham', function (user) {
  console.log(user ? user : 'Not found');
});

/* user contains:

{
  username: 'aiham',
  email: 'aiham@aiham.net',
  full_name: 'Aiham Hammami',
  github: 'aiham',
  twitter: 'aihamh',
  homepage: 'http://www.aiham.net',
  irc_handle: 'aiham',
  modules:
   [ { name: 'no-more-lies',
       url: '/package/no-more-lies',
       description: 'Javascript normaliser for user input from web forms, APIs, etc.' },
     { name: 'node-model.js',
       url: '/package/node-model.js',
       description: 'A simple ORM for use with Node.js and MySQL.' },
     { name: 'reddit-oauth',
       url: '/package/reddit-oauth',
       description: 'Reddit API wrapper' },
     { name: 'reddit-scrubber-cli',
       url: '/package/reddit-scrubber-cli',
       description: 'Removes comments and posts from your Reddit user page' },
     { name: 'valid8',
       url: '/package/valid8',
       description: 'Javascript data validator for use with user input from web forms, APIs, etc.' } ]
}

*/
```
