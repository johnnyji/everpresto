'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _NoteItem = require('./NoteItem');

var _NoteItem2 = _interopRequireDefault(_NoteItem);

var _actionsAppActions = require('../.././actions/AppActions');

var _actionsAppActions2 = _interopRequireDefault(_actionsAppActions);

var NotesList = (function (_React$Component) {
  _inherits(NotesList, _React$Component);

  function NotesList(props) {
    _classCallCheck(this, NotesList);

    _get(Object.getPrototypeOf(NotesList.prototype), 'constructor', this).call(this, props);
  }

  _createClass(NotesList, [{
    key: '_toggleNewNoteModal',
    value: function _toggleNewNoteModal() {
      _actionsAppActions2['default'].toggleModal('newNote');
    }
  }, {
    key: 'render',
    value: function render() {
      var p = this.props;
      var content = undefined;

      if (p.notes.length > 0) {
        content = _lodash2['default'].map(p.notes, function (note, i) {
          return _react2['default'].createElement(_NoteItem2['default'], { note: note, key: i });
        });
      } else {
        content = _react2['default'].createElement(
          'h3',
          { className: 'placeholder-message' },
          'No notes yet... Go ahead and',
          _react2['default'].createElement(
            'a',
            { onClick: this._toggleNewNoteModal },
            ' add one!'
          )
        );
      }

      return _react2['default'].createElement(
        'div',
        { className: 'notes-list-wrapper' },
        content
      );
    }
  }]);

  return NotesList;
})(_react2['default'].Component);

exports['default'] = NotesList;

NotesList.propTypes = {
  notes: _react2['default'].PropTypes.array.isRequired
};
module.exports = exports['default'];