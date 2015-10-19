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

var _LoginForm = require('./LoginForm');

var _LoginForm2 = _interopRequireDefault(_LoginForm);

var _RegistrationForm = require('./RegistrationForm');

var _RegistrationForm2 = _interopRequireDefault(_RegistrationForm);

var _storesAuthStore = require('../.././stores/AuthStore');

var _storesAuthStore2 = _interopRequireDefault(_storesAuthStore);

var AuthHandler = (function (_React$Component) {
  _inherits(AuthHandler, _React$Component);

  _createClass(AuthHandler, null, [{
    key: 'contextTypes',

    // Gets the location from the route component
    value: {
      location: _react.PropTypes.object
    },
    enumerable: true
  }]);

  function AuthHandler(props) {
    var _this = this;

    _classCallCheck(this, AuthHandler);

    _get(Object.getPrototypeOf(AuthHandler.prototype), 'constructor', this).call(this, props);

    this._getInitialState = function () {
      var state = _storesAuthStore2['default'].getState();
      return {
        user: state.user,
        errors: state.errors,
        loginError: state.loginError,
        registrationError: state.registrationError
      };
    };

    this._updateState = function (state) {
      _this.setState({
        user: state.user,
        errors: state.errors,
        loginError: state.loginError,
        registrationError: state.registrationError
      });
    };

    this.state = this._getInitialState();
  }

  _createClass(AuthHandler, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._unsubscribe = _storesAuthStore2['default'].listen(this._updateState);

      // redirects the user away from login/join pages if the user session already exists
      if (localStorage.getItem('jwt')) this.context.router.transitionTo('/dashboard');
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._unsubscribe();
    }
  }, {
    key: 'render',
    value: function render() {
      var path = this.context.location.pathname;

      // Returns the registration form if the route path is '/join', otherwise
      // returns the login form by default.
      if (path === '/join') {
        return _react2['default'].createElement(_RegistrationForm2['default'], {
          errors: this.state.errors,
          user: this.state.user,
          registrationError: this.state.registrationError
        });
      }

      return _react2['default'].createElement(_LoginForm2['default'], {
        loginError: this.state.loginError,
        errors: this.state.errors,
        user: this.state.user
      });
    }
  }]);

  return AuthHandler;
})(_react2['default'].Component);

exports['default'] = AuthHandler;
module.exports = exports['default'];