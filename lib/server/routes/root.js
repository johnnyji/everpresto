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

_mongoose2['default'].connect('mongodb://localhost/#{config.development.databaseName}', function (err) {
  if (err) {
    throw err;
  }
});

var router = _express2['default'].Router();
var db = _mongoose2['default'].connection;

router.get('/', function (req, res, next) {
  console.log('hit');
});

exports['default'] = router;
module.exports = exports['default'];