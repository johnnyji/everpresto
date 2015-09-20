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

var _reactWidgets = require('react-widgets');

var _InputFieldLabel = require('./InputFieldLabel');

var _InputFieldLabel2 = _interopRequireDefault(_InputFieldLabel);

var MultiselectField = (function (_ReactTemplate) {
  _inherits(MultiselectField, _ReactTemplate);

  function MultiselectField(props) {
    _classCallCheck(this, MultiselectField);

    _get(Object.getPrototypeOf(MultiselectField.prototype), 'constructor', this).call(this, props);
    this.state = { shrinkLabel: false };
    this._bindFunctions('_toggleShrinkLabel', '_updateSelections');
  }

  _createClass(MultiselectField, [{
    key: '_toggleShrinkLabel',
    value: function _toggleShrinkLabel() {
      this.setState({ shrinkLabel: !this.state.shrinkLabel });
    }
  }, {
    key: '_updateSelections',
    value: function _updateSelections(selections) {
      this.props.onUpdateSelections(selections);
    }
  }, {
    key: 'render',
    value: function render() {
      var p = this.props;
      var s = this.state;

      return _react2['default'].createElement(
        'div',
        { className: 'multiselect-field-wrapper' },
        p.label && _react2['default'].createElement(_InputFieldLabel2['default'], {
          labelName: p.label,
          error: p.error,
          shrinkLabel: s.shrinkLabel
        }),
        _react2['default'].createElement(_reactWidgets.Multiselect, {
          className: 'multiselect-input',
          placeholder: 'Type or click to filter',
          valueField: 'id',
          textField: 'name',
          caseSensitive: false,
          filter: 'contains',
          onChange: this._updateSelections,
          onFocus: this._toggleShrinkLabel,
          onBlur: this._toggleShrinkLabel,
          data: p.options
        })
      );
    }
  }]);

  return MultiselectField;
})(_ReactTemplate3['default']);

exports['default'] = MultiselectField;

MultiselectField.propTypes = {
  label: _react2['default'].PropTypes.string,
  options: _react2['default'].PropTypes.object.isRequired,
  onUpdateSelections: _react2['default'].PropTypes.func.isRequired,
  error: _react2['default'].PropTypes.any
};
module.exports = exports['default'];