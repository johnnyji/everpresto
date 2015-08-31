'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var TokenHelpers = (function () {
  function TokenHelpers() {
    _classCallCheck(this, TokenHelpers);
  }

  _createClass(TokenHelpers, null, [{
    key: 'createToken',
    value: function createToken(assignee, secret, expiresInMinutes) {
      expiresInMinutes = expiresInMinutes || 1440; // defaults to 24 hrs
      return _jsonwebtoken2['default'].sign(assignee, secret, {
        expiresInMinutes: expiresInMinutes
      });
    }
  }]);

  return TokenHelpers;
})();

exports['default'] = TokenHelpers;
module.exports = exports['default'];