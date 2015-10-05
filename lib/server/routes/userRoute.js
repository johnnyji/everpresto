'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var User = _mongoose2['default'].model('User');
var router = _express2['default'].Router();

router.post('/currentUser', function (req, res, next) {
  User.findOne({ _id: req.session.userId }).exec(function (err, user) {
    if (err) return res.status(500).json({ message: err.message });
    res.status(200).json({ user: user });
  });
});

exports['default'] = router;
module.exports = exports['default'];