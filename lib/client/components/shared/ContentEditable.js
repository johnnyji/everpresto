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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var ContentEditable = (function (_React$Component) {
  _inherits(ContentEditable, _React$Component);

  _createClass(ContentEditable, null, [{
    key: 'propTypes',
    value: {
      contentEditableClass: _react.PropTypes.string,
      html: _react.PropTypes.string,
      onChange: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  function ContentEditable(props) {
    var _this = this;

    _classCallCheck(this, ContentEditable);

    _get(Object.getPrototypeOf(ContentEditable.prototype), 'constructor', this).call(this, props);

    this._activateEditingState = function () {
      _this.setState({ editing: true });
    };

    this._emitChange = function () {
      _this.setState({ editing: false });

      var input = _react2['default'].findDOMNode(_this.refs.inputField).value;
      _this.props.onChange(input);
    };

    this.state = { editing: false };
  }

  _createClass(ContentEditable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Sets the contents of the content editable field to the
      // inital HTML text if one is provided.
      if (this.props.html) this.refs.inputField.innerHTML = this.props.html;
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = (0, _classnames2['default'])('content-editable', this.props.contentEditableClass);

      return _react2['default'].createElement(
        'div',
        { className: classes },
        _react2['default'].createElement('div', {
          ref: 'inputField',
          contentEditable: true,
          className: 'content-editable-input',
          onChange: this._emitChange,
          onBlur: this._emitChange,
          onFocus: this._activateEditingState
        }),
        !this.state.editing && _react2['default'].createElement(_Icon2['default'], { icon: 'create' })
      );
    }
  }]);

  return ContentEditable;
})(_react2['default'].Component);

exports['default'] = ContentEditable;
module.exports = exports['default'];