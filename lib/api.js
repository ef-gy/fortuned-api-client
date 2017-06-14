'use strict';

const meta = require('../package.json');
const request = require('request');
const Q = require('q');

/**
 * @brief Construct an API endpoint wrapper.
 *
 * This creates an API wrapper for calling into the `fortuned` API, with the
 * known exported endpoints. The default target is the publicly hosted version
 * at 'https://api.ef.gy'.
 *
 * If you're particularly privacy-conscious, you might want to subsitute the
 * Tor Hidden Service at 'http://664ov6iyvgpe63xn.onion' instead.
 *
 * Note that the target endpoint must not have a trailing slash or similar.
 *
 * @constructor
 * @param {string=} endpoint The target endpoint, optional.
 */
function Api(endpoint) {
  this.endpoint = endpoint || 'https://api.ef.gy';
}

/**
 * @brief Invoke GET /fortune on the fortuned server.
 *
 * Get a random or specific fortune cookie, depending on whether you specify the
 * `id` parameter.
 *
 * See https://github.com/ef-gy/fortuned/blob/master/README.md for more details.
 *
 * @param {number=} id Which cookie to get.
 * @return {Object} A promise of the cookie request.
 */
Api.prototype.fortune = function(id) {
  const deferred = Q.defer();

  let target = this.endpoint + '/fortune';
  if (typeof(id) === 'number') {
    target += '/' + id;
  }

  request({
    headers: {
      'Accept': 'text/json',
      'User-Agent': 'fortuned-api-client/' + meta.version,
    },
    uri: target,
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      const result = JSON.parse(body);
      deferred.resolve(result);
    } else {
      deferred.reject(error);
    }
  });

  return deferred.promise;
};

module.exports = Api;
