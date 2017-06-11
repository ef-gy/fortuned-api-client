#!/usr/bin/nodejs

'use strict';

const cookie = require('../');
const commander = require('commander');
const meta = require('../package.json');

commander
  .version(meta.version)
  .option('-c, --file', 'show the source file that the cookie came from')
  .option('--id <n>', 'get specific cookie', parseInt)
  .option('--show', 'print the cookie id, for use with --id')
  .option('--source', 'print the source of the cookie, with in-file id')
  .parse(process.argv);

/**
 * @brief Display the returned cookie.
 *
 * We have this invoked by the fortune cookie API's promise for when we do
 * successfully query a cookie.
 *
 * @param {Object} cookie A JSON object with fortune cookie data.
 */
function withCookie(cookie) {
  if (commander.file) {
    console.log('(%s)\n%%', cookie.file);
  }

  const extraNewline = commander.source || commander.show;
  if (extraNewline) {
    console.log(cookie.cookie);
  } else {
    process.stdout.write(cookie.cookie);
  }

  if (commander.source) {
    console.log('source file: %s#%d', cookie.file, cookie['file-id']);
  }
  if (commander.show) {
    console.log('cookie ID: %d', cookie.id);
  }
}

const api = new cookie.Api();

api.fortune(commander.id).then(withCookie, console.warn);
