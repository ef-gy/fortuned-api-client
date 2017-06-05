#!/usr/bin/nodejs

require('../fortuned-api-client').cookie().
  then(function(cookie) {
    process.stdout.write(cookie.cookie);
  }, console.warn);
