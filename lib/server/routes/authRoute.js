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

var _modelsUser = require('.././models/user');

var _modelsUser2 = _interopRequireDefault(_modelsUser);

var _helpersTokenHelpers = require('.././helpers/tokenHelpers');

var _helpersTokenHelpers2 = _interopRequireDefault(_helpersTokenHelpers);

var router = _express2['default'].Router();

router.post('/register', function (req, res, next) {
  var userParams = {
    email: req.body.user.email,
    password: req.body.user.password
  };
  _modelsUser2['default'].create(userParams, function (err, user) {
    if (err) return res.status(422).json({ message: err });
    res.status(201).json({
      user: user,
      token: _helpersTokenHelpers2['default'].createToken(user, req.app.get('tokenSecret'))
    });
  });
});

exports['default'] = router;
module.exports = exports['default'];