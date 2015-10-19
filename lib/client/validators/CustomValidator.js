'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var CustomValidator = function CustomValidator() {

  return {
    validateCorrectTimeInput: function validateCorrectTimeInput(hours, minutes) {
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
  };
};

exports['default'] = CustomValidator;
module.exports = exports['default'];