'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _secretsJson = require('../../.././secrets.json');

var _secretsJson2 = _interopRequireDefault(_secretsJson);

var NoteSchema = new _mongoose2['default'].Schema({
  title: { type: String, 'default': 'Untitled' },
  description: String,
  attachmentUrls: Array,
  isPrivate: { type: Boolean, 'default': false },
  group: String,
  user: String,
  commentIds: Array
});

var Note = _mongoose2['default'].model('Note', NoteSchema);

exports['default'] = Note;
module.exports = exports['default'];