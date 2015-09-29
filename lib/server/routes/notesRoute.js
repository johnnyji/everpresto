'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _modelsNote = require('.././models/note');

var _modelsNote2 = _interopRequireDefault(_modelsNote);

var router = _express2['default'].Router();

router.post('/', function (req, res, next) {
  _modelsNote2['default'].create(req.body.note, function (err, note) {
    err ? res.status(422).json({ message: err }) : res.status(201).json({ note: note });
  });
});

exports['default'] = router;
module.exports = exports['default'];