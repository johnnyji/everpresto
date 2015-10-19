'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _BaseValidator = require('./BaseValidator');

var _BaseValidator2 = _interopRequireDefault(_BaseValidator);

var InputValidator = function InputValidator() {

  // Private Properties
  var integerOnlyRegex = /^\d+$/;
  var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  var defaultErrors = {
    email: 'Invalid Email Format',
    integerOnly: 'Please only enter numbers',
    fieldPresence: 'Please fill out this field',
    passwordConfirmation: 'Passwords must match'
  };

  return {

    validateEmail: function validateEmail(errorMessage, email) {
      var condition = emailRegex.test(email);
      return _BaseValidator2['default'].testCondition(condition, defaultErrors.email, errorMessage);
    },

    validatePasswordConfirmation: function validatePasswordConfirmation(errorMessage, password, passwordConfirm) {
      var condition = password === passwordConfirm;
      return _BaseValidator2['default'].testCondition(condition, defaultErrors.passwordConfirm, errorMessage);
    },

    validateIntegerOnly: function validateIntegerOnly(errorMessage) {
      for (var _len = arguments.length, inputs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        inputs[_key - 1] = arguments[_key];
      }

      var invalidCount = 0;

      inputs.forEach(function (input) {
        var valid = integerOnlyRegex.test(input);
        if (!valid) invalidCount++;
      });

      var condition = invalidCount === 0;

      return _BaseValidator2['default'].testCondition(condition, defaultErrors.integerOnly, errorMessage);
    },

    validateLength: function validateLength(errorMessage, length) {
      for (var _len2 = arguments.length, inputs = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        inputs[_key2 - 2] = arguments[_key2];
      }

      var invalidCount = 0;

      inputs.forEach(function (input) {
        if (input == null) input = '';

        var valid = input.length >= length;
        if (!valid) invalidCount++;
      });

      var condition = invalidCount === 0;
      return _BaseValidator2['default'].testCondition(condition, 'Must be at least ' + length + ' chars long', errorMessage);
    },

    validateStringPresence: function validateStringPresence(errorMessage) {
      var invalidCount = 0;

      for (var _len3 = arguments.length, inputs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        inputs[_key3 - 1] = arguments[_key3];
      }

      inputs.forEach(function (input) {
        if (input == null) input = '';

        var valid = input !== '';
        if (!valid) invalidCount++;
      });

      var condition = invalidCount === 0;
      return _BaseValidator2['default'].testCondition(condition, defaultErrors.fieldPresence, errorMessage);
    }

  };
};

exports['default'] = InputValidator;
module.exports = exports['default'];