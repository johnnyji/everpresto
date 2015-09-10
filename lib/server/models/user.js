'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../../.././config');

var _config2 = _interopRequireDefault(_config);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var UserSchema = new _mongoose2['default'].Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePictureUrl: { type: String, 'default': _path2['default'].resolve(__dirname, './public/images/avatar.png') },
  createdAt: { type: Date, 'default': Date.now() },
  updatedAt: { type: Date, 'default': Date.now() },
  admin: { type: Boolean, 'default': false },
  isEmployee: { type: Boolean, 'default': false },
  isEmployer: { type: Boolean, 'default': true }
});

var User = _mongoose2['default'].model('User', UserSchema);

UserSchema.statics.findByJwt = function (jwt) {
  debugger;
  return new Promise((function (resolve, reject) {
    jwt.verify(jwt, _config2['default'].tokenSecret, (function (err, decoded) {
      if (err) reject(err);

      undefined.findOne(decoded, function (err, user) {
        if (err) reject(err);
        resolve(user);
      });
    }).bind(undefined));
  }).bind(undefined));
};

exports['default'] = User;
module.exports = exports['default'];