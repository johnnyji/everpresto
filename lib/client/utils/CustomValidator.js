'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Validator = require('./Validator');

var _Validator2 = _interopRequireDefault(_Validator);

var CustomValidator = (function () {
  function CustomValidator() {
    _classCallCheck(this, CustomValidator);
  }

  _createClass(CustomValidator, [{
    key: 'validateCorrectTimeInput',
    value: function validateCorrectTimeInput(hours, minutes) {
      hours = parseInt(hours);
      minutes = parseInt(minutes);
      if (isNaN(minutes) || isNaN(hours)) {
        return;
      }

      var exceedsDaysLength = hours > 24 || minutes > 0 && hours >= 24;
      var exceedsMaxMinutes = minutes > 60;
      var noTimeInputted = hours === 0 && minutes === 0;

      if (exceedsDaysLength) {
        return { valid: false, message: 'Total time cannot exceed 24 hours' };
      } else if (exceedsMaxMinutes) {
        return { valid: false, message: 'Minutes must be under 60' };
      } else if (noTimeInputted) {
        return { valid: false, message: 'Please input at least 1 minute' };
      }
      return { valid: true };
    }
  }]);

  return CustomValidator;
})();

exports['default'] = new CustomValidator();
module.exports = exports['default'];