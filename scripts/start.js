'use strict';

const main = require('../dist/index.js').main,
  fs = require('fs');
main(fs.readFileSync('/dev/stdin', 'utf8'));