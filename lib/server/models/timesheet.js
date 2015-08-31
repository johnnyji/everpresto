'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var Schema = _mongoose2['default'].Schema;

var TimesheetSchema = new Schema({
  email: String,
  note: String,
  workType: String,
  timeInSeconds: Number,
  createdAt: { type: Date, 'default': Date.now() },
  updatedAt: { type: Date, 'default': Date.now() }
});

// Timesheet.schema.path('email').validate(Validator.validateEmail, 'Invalid email format');
// Timesheet.schema.path('email').validate(Validator.timeInSeconds, 'Time cannot be greater than 24 hours');

exports['default'] = _mongoose2['default'].model('Timesheet', TimesheetSchema);
module.exports = exports['default'];