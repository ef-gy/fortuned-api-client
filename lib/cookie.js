'mode strict';

/**
 * Construct a Cookie object from JSON cookie data.
 *
 * @constructor
 * @param {Object} data
 */
function Cookie(data) {
  this.cookie = data.cookie;
  this.file = data.file;
  this.id = data.id;
  this.fileID = data['file-id'];
}

/**
 * Report whether or not a cookie is likely 'offensive'.
 *
 * @return {boolean} 'true' if offensive, 'false' otherwise.
 */
Cookie.prototype.isOffensive = function() {
  return /.*\/off\/.*/.test(this.file);
};

module.exports = Cookie;
