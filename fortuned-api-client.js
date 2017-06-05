var request = require('request');
var endpoint = 'https://api.ef.gy/fortune';

function cookie(opt_id) {
  var self = this;

  this.id = opt_id;
  this.success = function(cookie) {
    console.log(cookie.cookie);
  };
  this.error = console.warn;

  var target = endpoint;
  if (typeof(opt_id) === 'number') {
    target += '/' + opt_id;
  }

  this.request = request({
    uri: target,
    headers: {
      'Accept': 'text/json',
      'User-Agent': 'fortuned-api-client',
    },
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var result = JSON.parse(body);
      self.success(result);
    } else {
      self.error(error);
    }
  });
}

module.exports = {
  'cookie': cookie,
};
