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

var _ReactTemplate2 = require('./ReactTemplate');

var _ReactTemplate3 = _interopRequireDefault(_ReactTemplate2);

var _InputFieldLabel = require('./InputFieldLabel');

var _InputFieldLabel2 = _interopRequireDefault(_InputFieldLabel);

var TextField = (function (_ReactTemplate) {
  _inherits(TextField, _ReactTemplate);

  function TextField(props) {
    _classCallCheck(this, TextField);

    _get(Object.getPrototypeOf(TextField.prototype), 'constructor', this).call(this, props);
    this.state = { shrinkLabel: false };
    this._bindFunctions('_onInputChange', '_toggleShrinkLabel');
  }

  _createClass(TextField, [{
    key: '_toggleShrinkLabel',
    value: function _toggleShrinkLabel() {
      this.setState({ shrinkLabel: !this.state.shrinkLabel });
    }
  }, {
    key: '_onInputChange',
    value: function _onInputChange(e) {
      this.props.onInputChange(e);
    }
  }, {
    key: 'render',
    value: function render() {
      var p = this.props;
      var s = this.state;
      var onChangeFunc = p.onInputChange || null;
      var inputClass = p.error ? (p.inputClassName || '') + ' input-error' : p.inputClassName;

      return _react2['default'].createElement(
        'div',
        { className: 'input-field-wrapper' },
        _react2['default'].createElement(_InputFieldLabel2['default'], { shrinkLabel: s.shrinkLabel, error: p.error, labelName: p.label }),
        _react2['default'].createElement('textarea', {
          ref: 'textarea',
          className: inputClass,
          placeholder: p.inputPlaceholder,
          name: p.name,
          onFocus: this._toggleShrinkLabel,
          onBlur: this._toggleShrinkLabel,
          onChange: onChangeFunc })
      );
    }
  }]);

  return TextField;
})(_ReactTemplate3['default']);

exports['default'] = TextField;

TextField.propTypes = {
  label: _react2['default'].PropTypes.string,
  error: _react2['default'].PropTypes.any,
  name: _react2['default'].PropTypes.string,
  inputPlaceholder: _react2['default'].PropTypes.string.isRequired,
  onInputChange: _react2['default'].PropTypes.func,
  inputClassName: _react2['default'].PropTypes.string
};
module.exports = exports['default'];