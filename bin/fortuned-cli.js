#!/usr/bin/env node

'use strict';

const cookie = require('../');
const commander = require('commander');
const meta = require('../package.json');

commander
  .version(meta.version)
  .option('-o, --offensive', 'show a (potentially) offensive cookie')
  .option('-c, --file', 'show the source file that the cookie came from')
  .option('--endpoint [address]',
          'select the API endpoint [https://api.ef.gy]',
          'https://api.ef.gy')
  .option('--id <n>', 'get specific cookie', parseInt)
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

  if (co.isOffensive() != offensive) {
    if (retries < 50) {
      retries++;
      api.fortune(commander.id).then(withCookie, console.warn);
    } else {
      console.warn('Sorry, I couldn\'t find what you are looking for.');
    }
    return;
  }

  if (commander.file) {
    console.log('(%s)\n%%', co.file);
  }

  const extraNewline = commander.source || commander.show;
  if (extraNewline) {
    console.log(co.cookie);
  } else {
    process.stdout.write(co.cookie);
  }

  if (commander.source) {
    console.log('source file: %s#%d', co.file, co.fileID);
  }
  if (commander.show) {
    console.log('cookie ID: %d', co.id);
  }
}

api.fortune(commander.id).then(withCookie, console.warn);
