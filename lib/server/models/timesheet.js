'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var Schema = _mongoose2['default'].Schema;

var timesheetSchema = new Schema({
  email: String,
  note: String,
  workType: String,
  timeInSeconds: Number
});

exports['default'] = _mongoose2['default'].model('timesheet', timesheetSchema);
module.exports = exports['default'];