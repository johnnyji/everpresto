'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _actionsAuthActions = require('.././actions/AuthActions');

var _actionsAuthActions2 = _interopRequireDefault(_actionsAuthActions);

var _storesAuthStore = require('.././stores/AuthStore');

var _storesAuthStore2 = _interopRequireDefault(_storesAuthStore);

var AuthHelper = (function () {
  function AuthHelper() {
    _classCallCheck(this, AuthHelper);
  }

  _createClass(AuthHelper, [{
    key: 'updateCurrentUser',

    // checks for current user, if non existent then it auto logins based on jwt in localStorage
    value: function updateCurrentUser() {
      if (_storesAuthStore2['default'].getCurrentUser()) return;

      var jwt = localStorage.getItem('jwt');
      if (jwt) _actionsAuthActions2['default'].autoLoginUser(jwt);
    }
  }]);

  return AuthHelper;
})();

exports['default'] = new AuthHelper();
module.exports = exports['default'];