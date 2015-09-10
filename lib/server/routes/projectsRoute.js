'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../../.././config');

var _config2 = _interopRequireDefault(_config);

var _modelsProject = require('.././models/project');

var _modelsProject2 = _interopRequireDefault(_modelsProject);

var router = _express2['default'].Router();

router.get('/', function (req, res, next) {
  _modelsProject2['default'].find({}, function (err, projects) {
    err ? res.status(500).json(err) : res.status(200).json({ projects: projects });
  });
});

exports['default'] = router;
module.exports = exports['default'];