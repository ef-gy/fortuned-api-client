var meta = require('./package.json');

var request = require('request');
var Q = require('q');

var endpoint = 'https://api.ef.gy/fortune';

function cookie(opt_id) {
  var deferred = Q.defer();

  var target = endpoint;
  if (typeof(opt_id) === 'number') {
    target += '/' + opt_id;
  }

  this.request = request({
    uri: target,
    headers: {
      'Accept': 'text/json',
      'User-Agent': 'fortuned-api-client/' + meta.version,
    },
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var result = JSON.parse(body);
      deferred.resolve(result);
    } else {
      deferred.reject(error);
    }
  });

  return deferred.promise;
}

module.exports = {
  'cookie': cookie,
};
