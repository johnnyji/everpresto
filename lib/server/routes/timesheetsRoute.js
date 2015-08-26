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

var _modelsTimesheet = require('.././models/timesheet');

var _modelsTimesheet2 = _interopRequireDefault(_modelsTimesheet);

var router = _express2['default'].Router();
var db = _mongoose2['default'].connection;

router.get('/', function (req, res) {
  _modelsTimesheet2['default'].find(function (err, timesheets) {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(200).send({ timesheets: timesheets });
  });
});

router.post('/', function (req, res) {
  var timesheet = new _modelsTimesheet2['default'](req.params.timesheet);
  timesheet.save(function (err) {
    if (err) {
      return res.status(500).json(err);
    }
    res.state(201).json(null);
  });
});

exports['default'] = router;
module.exports = exports['default'];