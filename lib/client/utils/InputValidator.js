'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var InputValidator = (function () {
  function InputValidator() {
    _classCallCheck(this, InputValidator);
  }

  _createClass(InputValidator, null, [{
    key: 'validateEmail',
    value: function validateEmail(errorMessage, email) {
      var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      if (emailRegex.test(email)) {
        return { valid: true };
      }
      return {
        valid: false,
        message: errorMessage || 'Invalid email format'
      };
    }
  }, {
    key: 'validatePasswordConfirmation',
    value: function validatePasswordConfirmation(errorMessage, password, passwordConfirmation) {
      if (password === passwordConfirmation) {
        return { valid: true };
      }
      return {
        valid: false,
        message: errorMessage || 'Password confirmation must match password!'
      };
    }
  }, {
    key: 'validateIntegerOnly',
    value: function validateIntegerOnly(errorMessage) {
      var integersRegex = /^\d+$/;
      var invalidCount = 0;

      for (var _len = arguments.length, inputs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        inputs[_key - 1] = arguments[_key];
      }

      inputs.forEach(function (input) {
        var valid = integersRegex.test(input);
        if (!valid) {
          invalidCount++;
        }
      });
      if (invalidCount === 0) {
        return { valid: true };
      }
      return {
        valid: false,
        message: errorMessage || 'Please only enter numbers'
      };
    }
  }, {
    key: 'validateLength',
    value: function validateLength(errorMessage, length) {
      var invalidCount = 0;

      for (var _len2 = arguments.length, inputs = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        inputs[_key2 - 2] = arguments[_key2];
      }

      inputs.forEach(function (input) {
        if (input == null) {
          input = '';
        }

        var valid = input.length === length;
        if (!valid) {
          invalidCount++;
        }
      });
      if (invalidCount === 0) {
        return { valid: true };
      }
      return {
        valid: false,
        message: errorMessage || 'Must be at least ' + length + ' chars long'
      };
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
      if (invalidCount === 0) {
        return { valid: true };
      }
      return {
        valid: false,
        message: errorMessage || 'Please fill out this field'
      };
    }
  }]);

  return InputValidator;
})();

exports['default'] = InputValidator;
module.exports = exports['default'];