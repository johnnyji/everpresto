'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('../../.././config');

var _config2 = _interopRequireDefault(_config);

var router = _express2['default'].Router();
var db = _mongoose2['default'].connection;

router.get('/', function (req, res, next) {
  res.json({ timesheets: 'Here they are!' });
});

exports['default'] = router;
module.exports = exports['default'];