'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _modelsUser = require('.././models/User');

var _modelsUser2 = _interopRequireDefault(_modelsUser);

var router = _express2['default'].Router();

router.post('/currentUser', function (req, res, next) {
  _modelsUser2['default'].findOne({ _id: req.session.userId }).exec(function (err, user) {
    if (err) return res.status(500).json({ message: err.message });
    res.status(200).json({ user: user });
  });
});

exports['default'] = router;
module.exports = exports['default'];