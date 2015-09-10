'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../../.././config');

var _config2 = _interopRequireDefault(_config);

var _modelsTimesheet = require('.././models/timesheet');

var _modelsTimesheet2 = _interopRequireDefault(_modelsTimesheet);

var router = _express2['default'].Router();

router.route('/').get(function (req, res, next) {
  // get all timesheets
  _modelsTimesheet2['default'].find({}, function (err, timesheets) {
    err ? res.status(500).json(err) : res.status(200).json({ timesheets: timesheets });
  });
}).post(function (req, res, next) {
  // create a timesheet
  var timesheet = new _modelsTimesheet2['default'](req.body.timesheet);
  timesheet.save(function (err) {
    err ? res.status(500).json({ message: 'Unable to save' }) : res.status(201).json({ timesheet: timesheet });
  });
})['delete'](function (req, res, next) {
  // delete a timesheet
  _modelsTimesheet2['default'].remove({ _id: req.body._id }, function (err) {
    err ? res.status(500).json(err) : res.status(200).json({ _id: req.body._id });
  });
});

exports['default'] = router;
module.exports = exports['default'];