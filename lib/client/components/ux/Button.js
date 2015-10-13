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

var Button = (function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button() {
    var _this = this;

    _classCallCheck(this, Button);

    _get(Object.getPrototypeOf(Button.prototype), 'constructor', this).apply(this, arguments);

    this._handleClick = function () {
      _this.props.onButtonClick();
    };
  }

  _createClass(Button, [{
    key: 'render',
    value: function render() {
      var buttonClass = (0, _classnames2['default'])('button', this.props.buttonClass);
      var iconClass = (0, _classnames2['default'])('button-content-icon', this.props.iconClass);
      var buttonContent = undefined;

      if (this.props.iconName && this.props.text) {
        // when the button has both text and an icon
        buttonContent = _react2['default'].createElement(
          'div',
          { classNames: 'button-content' },
          _react2['default'].createElement(_Icon2['default'], { icon: this.props.iconName, iconClass: iconClass }),
          ' ',
          this.props.text
        );
      } else if (this.props.text) {
        // if there's only text
        buttonContent = _react2['default'].createElement(
          'div',
          { className: 'button-content' },
          this.props.text
        );
      } else {
        // if there's only an icon
        buttonContent = _react2['default'].createElement(
          'div',
          { className: 'button-content' },
          _react2['default'].createElement(_Icon2['default'], { icon: this.props.iconName, iconClass: iconClass })
        );
      }

      return _react2['default'].createElement(
        'button',
        { className: buttonClass, onClick: this._handleClick },
        buttonContent
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      buttonClass: _react.PropTypes.string,
      disabled: _react.PropTypes.bool.isRequired,
      iconClass: _react.PropTypes.string,
      iconName: _react.PropTypes.string,
      onButtonClick: _react.PropTypes.func.isRequired,
      textClass: _react.PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      disabled: false,
      onButtonClick: function onButtonClick() {}
    },
    enumerable: true
  }]);

  return Button;
})(_react2['default'].Component);

exports['default'] = Button;
module.exports = exports['default'];