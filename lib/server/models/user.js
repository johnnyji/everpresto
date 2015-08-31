'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var UserSchema = new _mongoose2['default'].Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, 'default': Date.now() },
  updatedAt: { type: Date, 'default': Date.now() },
  admin: { type: Boolean, 'default': false }
});

var User = _mongoose2['default'].model('User', UserSchema);

exports['default'] = User;
module.exports = exports['default'];