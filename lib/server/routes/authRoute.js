'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../../.././config');

var _config2 = _interopRequireDefault(_config);

var _modelsUser = require('.././models/user');

var _modelsUser2 = _interopRequireDefault(_modelsUser);

var router = _express2['default'].Router();

// write function to protect routes where jwt is required

router.post('/register', function (req, res, next) {
  var userParams = {
    email: req.body.user.email,
    password: req.body.user.password
  };
  _modelsUser2['default'].create(userParams, function (err, user) {
    if (err) return res.status(422).json({ message: err });
    res.status(201).json({
      user: user,
      token: _jsonwebtoken2['default'].sign(user._id, _config2['default'].tokenSecret)
    });
  });
});

router.post('/currentUser', function (req, res, next) {
  _jsonwebtoken2['default'].verify(req.body.token, _config2['default'].tokenSecret, function (err, decoded) {
    if (err) return res.status(500).json({ message: err.message });
    res.status(200).json({ user: decoded });
  });
});

exports['default'] = router;
module.exports = exports['default'];