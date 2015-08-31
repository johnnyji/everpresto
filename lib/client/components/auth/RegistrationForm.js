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

var _sharedErrorMessageBox = require('.././shared/ErrorMessageBox');

var _sharedErrorMessageBox2 = _interopRequireDefault(_sharedErrorMessageBox);

var _sharedInputField = require('.././shared/InputField');

var _sharedInputField2 = _interopRequireDefault(_sharedInputField);

var _actionsAuthActions = require('../.././actions/AuthActions');

var _actionsAuthActions2 = _interopRequireDefault(_actionsAuthActions);

var RegistrationForm = (function (_ReactTemplate) {
  _inherits(RegistrationForm, _ReactTemplate);

  function RegistrationForm(props) {
    _classCallCheck(this, RegistrationForm);

    _get(Object.getPrototypeOf(RegistrationForm.prototype), 'constructor', this).call(this, props);
    this._bindFunctions('_handleEmailChange', '_handlePasswordChange', '_handlePasswordConfirmationChange', '_registerUser');
  }

  _createClass(RegistrationForm, [{
    key: '_handleEmailChange',
    value: function _handleEmailChange(e) {
      _actionsAuthActions2['default'].handleEmailChange(e.target.value);
    }
  }, {
    key: '_handlePasswordChange',
    value: function _handlePasswordChange(e) {
      _actionsAuthActions2['default'].handlePasswordChange(e.target.value);
      _actionsAuthActions2['default'].handlePasswordConfirmationChange(this.props.user.passwordConfirmation);
    }
  }, {
    key: '_handlePasswordConfirmationChange',
    value: function _handlePasswordConfirmationChange(e) {
      _actionsAuthActions2['default'].handlePasswordConfirmationChange(e.target.value);
    }
  }, {
    key: '_registerUser',
    value: function _registerUser(e) {
      e.preventDefault();
      _actionsAuthActions2['default'].createUser({ user: userData });
    }
  }, {
    key: '_dismissError',
    value: function _dismissError() {
      this.setState({ registrationError: null });
    }
  }, {
    key: 'render',
    value: function render() {
      var p = this.props;

      return _react2['default'].createElement(
        'form',
        { onSubmit: this._registerUser },
        _react2['default'].createElement(_sharedErrorMessageBox2['default'], { message: p.registrationError, dismissError: this._dismissError }),
        _react2['default'].createElement(_sharedInputField2['default'], {
          label: 'Email',
          type: 'email',
          error: p.errors.email,
          onInputChange: this._handleEmailChange
        }),
        _react2['default'].createElement(_sharedInputField2['default'], {
          label: 'Password',
          type: 'password',
          error: p.errors.password,
          onInputChange: this._handlePasswordChange
        }),
        _react2['default'].createElement(_sharedInputField2['default'], {
          label: 'Confirm Password',
          type: 'password',
          error: p.errors.passwordConfirmation,
          onInputChange: this._handlePasswordConfirmationChange
        }),
        _react2['default'].createElement('input', { type: 'submit', defaultValue: 'Join' })
      );
    }
  }]);

  return RegistrationForm;
})(_sharedReactTemplate2['default']);

exports['default'] = RegistrationForm;

RegistrationForm.propTypes = {
  user: _react2['default'].PropTypes.object.isRequired,
  errors: _react2['default'].PropTypes.object.isRequired,
  registrationError: _react2['default'].PropTypes.string
};
module.exports = exports['default'];