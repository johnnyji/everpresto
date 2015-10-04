'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ApiCaller = (function () {
  function ApiCaller() {
    _classCallCheck(this, ApiCaller);
  }

  _createClass(ApiCaller, [{
    key: 'sendAjaxRequest',

    // this method assumes that you are sending/receiving JSON
    // options: { url: ..., method:..., data:... }
    value: function sendAjaxRequest(options) {
      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open(options.method, options.url);
        request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        console.log('Sending ' + options.method + ' Request to ' + options.url);
        options.data ? request.send(JSON.stringify(options.data)) : request.send();

        request.onload = function () {
          // we don't need to parse it if it's an empty string
          var responseText = request.responseText ? JSON.parse(request.responseText) : request.responseText;

          var result = {
            status: request.status,
            data: responseText
          };

          result.status >= 200 && result.status <= 299 ? resolve(result) : reject(result);
          console.log('Response: ', result.data);
        };

        request.onerror = function () {
          reject({ status: 500, data: 'Connection error' });
        };
      });
    }
  }]);

  return ApiCaller;
})();

exports['default'] = new ApiCaller();
module.exports = exports['default'];