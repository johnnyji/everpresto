'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var GroupSchema = _mongoose2['default'].Schema({
  name: { type: String, required: true },
  memberIds: { type: Array, 'default': [] },
  ownerId: String
});

var Group = _mongoose2['default'].model('Group', GroupSchema);

exports['default'] = Group;
module.exports = exports['default'];