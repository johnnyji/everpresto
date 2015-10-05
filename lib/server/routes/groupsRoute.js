'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var Group = _mongoose2['default'].model('Group');
var User = _mongoose2['default'].model('User');
var router = _express2['default'].Router();

router.get('/active', function (req, res, next) {
  User.findOne({ _id: req.session.userId }, 'activeGroupId', function (err, user) {
    if (err) return res.status(500).json({ message: err });
    res.status(200).json(null);
  });
});

exports['default'] = router;
module.exports = exports['default'];