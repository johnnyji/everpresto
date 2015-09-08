'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _BaseValidator2 = require('./BaseValidator');

var _BaseValidator3 = _interopRequireDefault(_BaseValidator2);

var InputValidator = (function (_BaseValidator) {
  _inherits(InputValidator, _BaseValidator);

  function InputValidator() {
    _classCallCheck(this, InputValidator);

    _get(Object.getPrototypeOf(InputValidator.prototype), 'constructor', this).call(this);
    this.integerOnlyRegex = /^\d+$/;
    this.emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    this.defaultErrors = {
      email: 'Invalid Email Format',
      integerOnly: 'Please only enter numbers',
      fieldPresence: 'Please fill out this field',
      passwordConfirmation: 'Passwords must match'
    };
  }

  _createClass(InputValidator, [{
    key: 'validateEmail',
    value: function validateEmail(errorMessage, email) {
      var condition = this.emailRegex.test(email);
      return this._testCondition(condition, this.defaultErrors.email, errorMessage);
    }
  }, {
    key: 'validatePasswordConfirmation',
    value: function validatePasswordConfirmation(errorMessage, password, passwordConfirmation) {
      var condition = password === passwordConfirmation;
      return this._testCondition(condition, this.defaultErrors.passwordConfirmation, errorMessage);
    }
  }, {
    key: 'validateIntegerOnly',
    value: function validateIntegerOnly(errorMessage) {
      var _this = this;

      var invalidCount = 0;

      for (var _len = arguments.length, inputs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        inputs[_key - 1] = arguments[_key];
      }

      inputs.forEach((function (input) {
        var valid = _this.integerOnlyRegex.test(input);
        if (!valid) invalidCount++;
      }).bind(this));

      var condition = invalidCount === 0;
      return this._testCondition(condition, this.defaultErrors.integerOnly, errorMessage);
    }
  }, {
    key: 'validateLength',
    value: function validateLength(errorMessage, length) {
      var invalidCount = 0;

      for (var _len2 = arguments.length, inputs = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        inputs[_key2 - 2] = arguments[_key2];
      }

      inputs.forEach(function (input) {
        if (input == null) input = '';

        var valid = input.length >= length;
        if (!valid) invalidCount++;
      });

      var condition = invalidCount === 0;
      return this._testCondition(condition, 'Must be at least ' + length + ' chars long', errorMessage);
    }
  }, {
    key: 'validateStringPresence',
    value: function validateStringPresence(errorMessage) {
      var invalidCount = 0;

      for (var _len3 = arguments.length, inputs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        inputs[_key3 - 1] = arguments[_key3];
      }

      inputs.forEach(function (input) {
        if (input == null) {
          input = '';
        }

        var valid = input !== '';
        if (!valid) {
          invalidCount++;
        }
      });

      var condition = invalidCount === 0;
      return this._testCondition(condition, this.defaultErrors.fieldPresence, errorMessage);
    }
  }]);

  return InputValidator;
})(_BaseValidator3['default']);

exports['default'] = new InputValidator();
module.exports = exports['default'];