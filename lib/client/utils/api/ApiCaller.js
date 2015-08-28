'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('../../../.././config');

var _config2 = _interopRequireDefault(_config);

var ApiCaller = (function () {
  function ApiCaller() {
    _classCallCheck(this, ApiCaller);
  }

  _createClass(ApiCaller, null, [{
    key: 'sendAjaxRequest',

    // this method assumes that you are sending/receiving JSON
    // options: { url: ..., method:..., data:... }
    value: function sendAjaxRequest(options) {
      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open(options.method, options.url);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        console.log('Sending ' + options.method + ' Request to ' + options.url);

        options.data ? request.send(JSON.stringify(options.data)) : request.send();

        request.onload = function () {
          var result = {
            status: request.status,
            data: JSON.parse(request.responseText)
          };
          if (result.status >= 200 && result.status <= 299) {
            console.log('Response: ', result.data);
            resolve(result);
          } else {
            console.log('Response: ', result.data);
            reject(result);
          }
        };

        request.onerror = function () {
          reject({ status: 500, data: 'Connection error' });
        };
      });
    }
  }]);

  return ApiCaller;
})();

exports['default'] = ApiCaller;
module.exports = exports['default'];