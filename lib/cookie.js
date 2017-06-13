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

/**
 * Create a string representation of the fortune cookie.
 *
 * This is for writing the cookie to the standard output and presenting it to
 * the user.
 *
 * @param {boolean=} showFile Prepend the source file name like `fortune -c`.
 * @param {boolean=} source Append the full source file and id in that.
 * @param {boolean=} cookieID Append the unique cookie ID.
 * @return {string}
 */
Cookie.prototype.toString = function(showFile, source, cookieID) {
  let rv = this.cookie.trim();

  if (showFile) {
    rv = '(' + this.file + ')\n%\n' + rv;
  }

  if (source || cookieID) {
    rv += '\n%';
  }
  if (source) {
    rv += '\n' + this.file + '#' + this.fileID;
  }
  if (cookieID) {
    rv += '\n' + this.id;
  }

  return rv;
};

module.exports = Cookie;
