'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sharedReactTemplate = require('.././shared/ReactTemplate');

var _sharedReactTemplate2 = _interopRequireDefault(_sharedReactTemplate);

var _LoginForm = require('./LoginForm');

var _LoginForm2 = _interopRequireDefault(_LoginForm);

var _RegistrationForm = require('./RegistrationForm');

var _RegistrationForm2 = _interopRequireDefault(_RegistrationForm);

var _storesAuthStore = require('../.././stores/AuthStore');

var _storesAuthStore2 = _interopRequireDefault(_storesAuthStore);

var AuthHandler = (function (_ReactTemplate) {
  _inherits(AuthHandler, _ReactTemplate);

  function AuthHandler(props) {
    _classCallCheck(this, AuthHandler);

    _get(Object.getPrototypeOf(AuthHandler.prototype), 'constructor', this).call(this, props);
    this.state = this._getInitialState();
    this._bindFunctions('_getInitialState', '_updateState');
  }

  _createClass(AuthHandler, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._unsubscribe = _storesAuthStore2['default'].listen(this._updateState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._unsubscribe();
    }
  }, {
    key: '_getInitialState',
    value: function _getInitialState() {
      var state = _storesAuthStore2['default'].getState();
      return {
        user: state.user,
        errors: state.errors,
        loginError: state.loginError,
        registrationError: state.registrationError
      };
    }
  }, {
    key: '_updateState',
    value: function _updateState(state) {
      this.setState({
        user: state.user,
        errors: state.errors,
        loginError: state.loginError,
        registrationError: state.registrationError
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var s = this.state;
      var path = this.context.router.getCurrentPathname();

      if (path === '/login') {
        return _react2['default'].createElement(_LoginForm2['default'], {
          loginError: s.loginError,
          errors: s.errors,
          user: s.user
        });
      } else if (path === '/join') {
        return _react2['default'].createElement(_RegistrationForm2['default'], {
          registrationError: s.registrationError
        });
      }
    }
  }]);

  return AuthHandler;
})(_sharedReactTemplate2['default']);

exports['default'] = AuthHandler;
module.exports = exports['default'];