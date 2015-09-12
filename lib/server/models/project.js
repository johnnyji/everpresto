'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var Schema = _mongoose2['default'].Schema;

var ProjectSchema = new Schema({
  name: String,
  manager: { type: Object, required: true },
  budgetInCents: Number,
  endDate: Date,
  startDate: Date,
  assignees: { type: Array, required: true },
  archived: { type: Boolean, 'default': false },
  createdAt: { type: Date, 'default': Date.now() },
  updatedAt: { type: Date, 'default': Date.now() }
});

exports['default'] = _mongoose2['default'].model('Project', ProjectSchema);
module.exports = exports['default'];