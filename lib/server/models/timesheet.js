'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var Schema = _mongoose2['default'].Schema;

var Timesheet = _mongoose2['default'].model('Timesheet', new Schema({
  _id: Schema.Types.ObjectId,
  email: String,
  note: String,
  workType: String,
  timeInSeconds: Number,
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
}));

exports['default'] = Timesheet;
module.exports = exports['default'];