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

var _actionsAuthActions = require('../.././actions/AuthActions');

var _actionsAuthActions2 = _interopRequireDefault(_actionsAuthActions);

var _storesAuthStore = require('../.././stores/AuthStore');

var _storesAuthStore2 = _interopRequireDefault(_storesAuthStore);

var LoginForm = (function (_ReactTemplate) {
  _inherits(LoginForm, _ReactTemplate);

  function LoginForm(props) {
    _classCallCheck(this, LoginForm);

    _get(Object.getPrototypeOf(LoginForm.prototype), 'constructor', this).call(this, props);
    this.state = { loginError: _storesAuthStore2['default'].getState.loginError };
    this._bindFunctions('_loginUser', '_updateState');
  }

  _createClass(LoginForm, [{
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
    key: '_updateState',
    value: function _updateState(state) {
      this.setState({ loginError: state.loginError });
    }
  }, {
    key: '_loginUser',
    value: function _loginUser(e) {
      e.preventDefault();
      var userData = {
        email: _react2['default'].findDOMNode(this.refs.email).value,
        password: _react2['default'].findDOMNode(this.refs.password).value
      };

      _actionsAuthActions2['default'].loginUser({ user: userData });
    }
  }, {
    key: 'render',
    value: function render() {
      var s = this.state;

      return _react2['default'].createElement(
        'form',
        { className: 'login-form-wrapper', onSubmit: this._loginUser },
        s.loginError && _react2['default'].createElement(
          'p',
          null,
          s.loginError
        ),
        _react2['default'].createElement(
          'label',
          null,
          'Email'
        ),
        _react2['default'].createElement('input', { type: 'email', ref: 'email' }),
        _react2['default'].createElement(
          'label',
          null,
          'Password'
        ),
        _react2['default'].createElement('input', { type: 'password', ref: 'password' }),
        _react2['default'].createElement('input', { type: 'submit', defaultValue: 'Login' })
      );
    }
  }]);

  return LoginForm;
})(_sharedReactTemplate2['default']);

exports['default'] = LoginForm;
module.exports = exports['default'];