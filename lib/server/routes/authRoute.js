'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _secretsJson = require('../../.././secrets.json');

var _secretsJson2 = _interopRequireDefault(_secretsJson);

var _modelsUser = require('.././models/User');

var _modelsUser2 = _interopRequireDefault(_modelsUser);

var router = _express2['default'].Router();

router.post('/login', function (req, res, next) {
  _modelsUser2['default'].findOne({
    email: req.body.user.email,
    password: req.body.user.password
  }).exec(function (err, user) {
    if (err) throw new Error(err);
    if (!user) return res.status(422).json({ message: 'Invalid Username/Password' });

    // sets the user session on the backend and sends the jwt to the front end
    req.session.userId = user._id;
    res.status(200).json({
      user: user,
      jwt: _jsonwebtoken2['default'].sign(user._id, _secretsJson2['default'].jwtSecret)
    });
  });
});

router.get('/logout', function (req, res, next) {
  delete req.session.userId;
  res.status(204).json(null);
});

router.post('/authenticate_with_token', function (req, res, next) {
  _jsonwebtoken2['default'].verify(req.body.jwt, _secretsJson2['default'].jwtSecret, function (err, decoded) {
    if (err) return res.status(500).json({ message: err.message });

    _modelsUser2['default'].findOne({
      email: decoded.email,
      password: decoded.password
    }).exec(function (err, user) {
      res.status(201).json({ user: user });
    });
  });
});

router.post('/register', function (req, res, next) {
  var userParams = {
    email: req.body.user.email,
    password: req.body.user.password
  };
  _modelsUser2['default'].create(userParams, function (err, user) {
    if (err) return res.status(422).json({ message: err });
    res.status(201).json({
      user: user,
      jwt: _jsonwebtoken2['default'].sign(user._id, _secretsJson2['default'].jwtSecret)
    });
  });
});

exports['default'] = router;
module.exports = exports['default'];