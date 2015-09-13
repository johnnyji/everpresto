'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _accounting = require('accounting');

var _accounting2 = _interopRequireDefault(_accounting);

var CurrencyInputField = (function (_React$Component) {
  _inherits(CurrencyInputField, _React$Component);

  function CurrencyInputField(props) {
    _classCallCheck(this, CurrencyInputField);

    _get(Object.getPrototypeOf(CurrencyInputField.prototype), 'constructor', this).call(this, props);
    this.state = { value: props.value };
    this._onChange = this._onChange.bind(this);
  }

  _createClass(CurrencyInputField, [{
    key: '_onChange',
    value: function _onChange(e) {
      var _this = this;

      var value = this._maskedInputValue(e.target.value, e.target.validity);

      this.setState({ value: value }, function () {
        if (_this.props.onChange) {
          // call original callback, if it exists
          var valueInCents = parseInt(value) * 100;
          _this.props.onChange(valueInCents);
        }
      });
    }
  }, {
    key: '_maskedInputValue',
    value: function _maskedInputValue(value) {
      var validity = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      // a falsy value with "good" input indicates the user is clearing the text,
      // so allow them to.
      if (!value && !validity.badInput) {
        return null;
      }

      // extract digits. if no digits, fill in a zero.
      var digits = value.match(/\d/g) || ['0'];

      // zero-pad a one-digit input
      if (digits.length === 1) {
        digits.unshift('0');
      }

      // add a decimal point
      digits.splice(digits.length - 2, 0, '.');

      // make a number with 2 decimal points
      return Number(digits.join('')).toFixed(2);
    }
  }, {
    key: 'render',
    value: function render() {
      var value = _accounting2['default'].formatMoney(this.state.value, '$', 2);

      return _react2['default'].createElement('input', _extends({}, this.props, {
        type: 'text',
        pattern: '\\d*',
        value: value,
        onChange: this._onChange
      }));
    }
  }]);

  return CurrencyInputField;
})(_react2['default'].Component);

exports['default'] = CurrencyInputField;

CurrencyInputField.propTypes = {
  onChange: _react2['default'].PropTypes.func
};
module.exports = exports['default'];