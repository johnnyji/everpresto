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

var _reactQuill = require('react-quill');

var _reactQuill2 = _interopRequireDefault(_reactQuill);

var _sharedBlendedInputField = require('.././shared/BlendedInputField');

var _sharedBlendedInputField2 = _interopRequireDefault(_sharedBlendedInputField);

var NoteForm = (function (_React$Component) {
  _inherits(NoteForm, _React$Component);

  function NoteForm(props) {
    var _this = this;

    _classCallCheck(this, NoteForm);

    _get(Object.getPrototypeOf(NoteForm.prototype), 'constructor', this).call(this, props);

    this._handleTitleChange = function (e) {
      _this.props.onTitleChange(e.target.value);
    };

    this._handleDescriptionChange = function (description) {
      if (description === '<div><br></div>') _this._showPlaceholder();
      // update the description of the new article
      _this.props.onDescriptionChange(description);
    };

    this._showPlaceholder = function () {
      var editor = _this.refs.quill.refs.editor;
      editor.firstChild.innerHTML = '';
    };
  }

  _createClass(NoteForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._showPlaceholder();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'note-form-wrapper' },
        _react2['default'].createElement(
          _reactQuill2['default'],
          {
            ref: 'quill',
            theme: 'snow',
            onChange: this._handleDescriptionChange },
          _react2['default'].createElement(_reactQuill.Toolbar, {
            theme: 'snow',
            key: 'toolbar',
            ref: 'toolbar',
            items: _reactQuill.Toolbar.defaultItems
          }),
          _react2['default'].createElement(_sharedBlendedInputField2['default'], {
            placeholder: 'Untitled',
            type: 'text',
            className: 'note-title',
            onChange: this._handleTitleChange
          }),
          _react2['default'].createElement('div', {
            key: 'editor',
            ref: 'editor',
            className: 'quill-contents'
          })
        )
      );
    }
  }]);

  return NoteForm;
})(_react2['default'].Component);

exports['default'] = NoteForm;

NoteForm.propTypes = {
  onTitleChange: _react2['default'].PropTypes.func.isRequired,
  onDescriptionChange: _react2['default'].PropTypes.func.isRequired
};
module.exports = exports['default'];