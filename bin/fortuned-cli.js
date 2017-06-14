#!/usr/bin/env node

'use strict';

const cookie = require('../');
const commander = require('commander');
const meta = require('../package.json');

commander
  .version(meta.version)
  .option('-a, --any', 'allow any sort of cookie, offensive or not')
  .option('-c, --file', 'show the source file that the cookie came from')
  .option('-l, --long', 'only show a long cookie')
  .option('-n, --length <n>', 'max length of a "short" cookie [160]',
          parseInt, 160)
  .option('-o, --offensive', 'show a (potentially) offensive cookie')
  .option('-s, --short', 'only show a short cookie')
  .option('-w, --wait', 'wait a while, based on the length of the cookie')
  .option('--endpoint <address>',
          'select the API endpoint [https://api.ef.gy]',
          'https://api.ef.gy')
  .option('--id <n>', 'get specific cookie', parseInt)
  .option('--retries <n>', 'max number of retries when searching [50]',
          parseInt, 50)
  .option('--show', 'print the cookie id, for use with --id')
  .option('--source', 'print the source of the cookie, with in-file id')
  .parse(process.argv);

const api = new cookie.Api(commander.endpoint);
let retries = 0;

/**
 * @brief Display the returned cookie.
 *
 * We have this invoked by the fortune cookie API's promise for when we do
 * successfully query a cookie.
 *
 * @param {Object} data A JSON object with fortune cookie data.
 */
function withCookie(data) {
  let co = new cookie.Cookie(data);
  let offensive = commander.offensive || false;

  if ((!commander.any && (co.isOffensive() != offensive)) ||
      (commander.short && (co.length() > commander.length)) ||
      (commander.long && (co.length() < commander.length))) {
    if (retries < commander.retries) {
      retries++;
      api.fortune(commander.id).then(withCookie, console.warn);
    } else {
      console.warn('Sorry, I couldn\'t find what you are looking for.');
    }
    return;
  }

  console.log(co.toString(commander.file, commander.source, commander.show));

  if (commander.wait) {
    setTimeout(function() {}, co.length() * 50);
  }
}

api.fortune(commander.id).then(withCookie, console.warn);
