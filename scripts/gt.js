/**
 * @since 2016-11-16 15:37
 * @author vivaxy
 */

if (!global._babelPolyfill) { // eslint-disable-line no-underscore-dangle
    require('babel-polyfill'); // eslint-disable-line global-require
}
require('babel-register');
module.exports = require('./gt/index');
