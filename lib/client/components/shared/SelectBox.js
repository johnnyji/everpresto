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

var _reactWidgets = require('react-widgets');

var _reactWidgets2 = _interopRequireDefault(_reactWidgets);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ReactTemplate2 = require('./ReactTemplate');

var _ReactTemplate3 = _interopRequireDefault(_ReactTemplate2);

var _InputFieldLabel = require('./InputFieldLabel');

var _InputFieldLabel2 = _interopRequireDefault(_InputFieldLabel);

var DropdownList = _reactWidgets2['default'].DropdownList;

var SelectBox = (function (_ReactTemplate) {
  _inherits(SelectBox, _ReactTemplate);

  function SelectBox(props) {
    _classCallCheck(this, SelectBox);

    _get(Object.getPrototypeOf(SelectBox.prototype), 'constructor', this).call(this, props);
    this.state = { shrinkLabel: false };
    this._bindFunctions('_handleChange', '_shrinkLabel', '_unshrinkLabel');
  }

  _createClass(SelectBox, [{
    key: '_handleChange',
    value: function _handleChange(value) {
      this._unshrinkLabel();
      this.props.onSelectChange(value);
    }
  }, {
    key: '_shrinkLabel',
    value: function _shrinkLabel() {
      this.setState({ shrinkLabel: true });
    }
  }, {
    key: '_unshrinkLabel',
    value: function _unshrinkLabel() {
      this.setState({ shrinkLabel: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var p = this.props;
      var s = this.state;
      // let options;

      // if (_.isArray(p.options)) {
      //   options = p.options;
      // } else if (_.isObject(p.options)) {
      //   options = _.map(p.options, (value, key) => {
      //     return <option key={key} value={key}>{value}</option>;
      //   });
      // }

      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(_InputFieldLabel2['default'], { shrinkLabel: s.shrinkLabel, error: p.error, labelName: p.labelName }),
        _react2['default'].createElement(DropdownList, {
          ref: 'select',
          defaultValue: p.selectPlaceholder,
          onFocus: this._shrinkLabel,
          onBlur: this._unshrinkLabel,
          onChange: this._handleChange,
          data: p.options
        })
      );
    }
  }]);

  return SelectBox;
})(_ReactTemplate3['default']);

exports['default'] = SelectBox;

SelectBox.propTypes = {
  error: _react2['default'].PropTypes.any,
  labelName: _react2['default'].PropTypes.string.isRequired,
  options: _react2['default'].PropTypes.any.isRequired,
  selectPlaceholder: _react2['default'].PropTypes.string.isRequired,
  onSelectChange: _react2['default'].PropTypes.func.isRequired
};
module.exports = exports['default'];
/*<select
 ref='select'
 defaultValue={p.selectPlaceholder} 
 onFocus={this._shrinkLabel}
 onBlur={this._unshrinkLabel}
 onChange={this._handleChange}>
 <option className='default-option' value='' disabled>{p.selectPlaceholder}</option>
 {options}
</select>*/