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

var InputFieldLabel = (function (_React$Component) {
  _inherits(InputFieldLabel, _React$Component);

  function InputFieldLabel(props) {
    _classCallCheck(this, InputFieldLabel);

    _get(Object.getPrototypeOf(InputFieldLabel.prototype), 'constructor', this).call(this, props);
  }

  _createClass(InputFieldLabel, [{
    key: 'render',
    value: function render() {
      var p = this.props;
      var labelClass = p.shrinkLabel ? 'shrinked-label' : '';

      if (p.error) {
        return _react2['default'].createElement(
          'p',
          { className: 'input-field-error' },
          p.error
        );
      }
      return _react2['default'].createElement(
        'label',
        { className: labelClass },
        p.labelName
      );
    }
  }]);

  return InputFieldLabel;
})(_react2['default'].Component);

exports['default'] = InputFieldLabel;

InputFieldLabel.propTypes = {
  shrinkLabel: _react2['default'].PropTypes.bool.isRequired,
  error: _react2['default'].PropTypes.any,
  labelName: _react2['default'].PropTypes.string.isRequired
};
module.exports = exports['default'];