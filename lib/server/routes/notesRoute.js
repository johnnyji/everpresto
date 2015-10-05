'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var Note = _mongoose2['default'].model('Note');
var router = _express2['default'].Router();

router.post('/', function (req, res, next) {
  Note.create(req.body.note, function (err, note) {
    err ? res.status(422).json({ message: err }) : res.status(201).json({ note: note });
  });
});

exports['default'] = router;
module.exports = exports['default'];