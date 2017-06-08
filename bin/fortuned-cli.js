#!/usr/bin/nodejs

var cookie = require('../fortuned-api-client').cookie,
    commander = require('commander'),
    meta = require('../package.json');

commander
  .version(meta.version)
  .option('-c, --id <n>', 'get specific cookie', parseInt)
  .option('-s, --source','print the source of the cookie')
  .option('-i, --show', 'print the cookie id, for use with --id')
  .parse(process.argv);

cookie(commander.id).then(function(cookie) {
      var extraNewline = commander.source || commander.show;
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
    }, console.warn);
