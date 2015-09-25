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

var _sharedReactTemplate = require('../.././shared/ReactTemplate');

var _sharedReactTemplate2 = _interopRequireDefault(_sharedReactTemplate);

var _sharedExitFormIcon = require('../.././shared/ExitFormIcon');

var _sharedExitFormIcon2 = _interopRequireDefault(_sharedExitFormIcon);

var _sharedBlendedInputField = require('../.././shared/BlendedInputField');

var _sharedBlendedInputField2 = _interopRequireDefault(_sharedBlendedInputField);

var _actionsAppActions = require('../../.././actions/AppActions');

var _actionsAppActions2 = _interopRequireDefault(_actionsAppActions);

var NewArticleForm = (function (_ReactTemplate) {
  _inherits(NewArticleForm, _ReactTemplate);

  function NewArticleForm(props) {
    _classCallCheck(this, NewArticleForm);

    _get(Object.getPrototypeOf(NewArticleForm.prototype), 'constructor', this).call(this, props);
    this._bindFunctions('_exitForm');
  }

  _createClass(NewArticleForm, [{
    key: '_exitForm',
    value: function _exitForm() {
      _actionsAppActions2['default'].toggleModal();
    }
  }, {
    key: 'render',
    value: function render() {
      var editorStyles = {
        '.ql-editor': {
          'font-size': '18px'
        },
        '.quill-contents': {
          'padding': '0.3rem'
        },
        '.quill-toolbar': {
          'padding': '0.3rem',
          'margin-bottom': '0.5rem'
        }
      };

      return _react2['default'].createElement(
        'div',
        { className: 'new-article-form-wrapper' },
        _react2['default'].createElement(_sharedExitFormIcon2['default'], { onExitClick: this._exitForm }),
        _react2['default'].createElement(
          _reactQuill2['default'],
          {
            theme: 'snow',
            styles: editorStyles
          },
          _react2['default'].createElement(_reactQuill.Toolbar, {
            theme: 'snow',
            ref: 'toolbar',
            value: 'toolbar',
            items: _reactQuill.Toolbar.defaultItems
          }),
          _react2['default'].createElement(_sharedBlendedInputField2['default'], {
            defaultValue: 'Untitled',
            type: 'text',
            className: 'article-title'
          }),
          _react2['default'].createElement('div', {
            key: 'editor',
            ref: 'editor',
            placeholder: 'Start Typing here...',
            className: 'quill-contents',
            dangerouslySetInnerHTML: { __html: 'Start typing here...' }
          })
        )
      );
    }
  }]);

  return NewArticleForm;
})(_sharedReactTemplate2['default']);

exports['default'] = NewArticleForm;

NewArticleForm.propTypes = {
  contacts: _react2['default'].PropTypes.array
};
module.exports = exports['default'];