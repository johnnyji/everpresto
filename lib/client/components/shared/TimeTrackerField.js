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

var _actionsNewTimesheetActions = require('../.././actions/NewTimesheetActions');

var _actionsNewTimesheetActions2 = _interopRequireDefault(_actionsNewTimesheetActions);

var _InputFieldLabel = require('./InputFieldLabel');

var _InputFieldLabel2 = _interopRequireDefault(_InputFieldLabel);

var TimeTrackerField = (function (_ReactTemplate) {
  _inherits(TimeTrackerField, _ReactTemplate);

  function TimeTrackerField(props) {
    _classCallCheck(this, TimeTrackerField);

    _get(Object.getPrototypeOf(TimeTrackerField.prototype), 'constructor', this).call(this, props);
    this.state = {
      shrinkLabel: false,
      showHourSuffix: true
    };
    this._bindFunctions('_handleInputFocus', '_handleInputBlur', '_clearPlaceholderTimeInput', '_setTime');
  }

  _createClass(TimeTrackerField, [{
    key: '_handleInputFocus',
    value: function _handleInputFocus() {
      this._clearPlaceholderTimeInput();
      this.setState({
        shrinkLabel: true,
        showHourSuffix: false
      });
    }
  }, {
    key: '_handleInputBlur',
    value: function _handleInputBlur() {
      this.setState({
        shrinkLabel: false,
        showHourSuffix: true
      });
    }
  }, {
    key: '_clearPlaceholderTimeInput',
    value: function _clearPlaceholderTimeInput() {
      var minutesValue = _react2['default'].findDOMNode(this.refs.minutes).value;
      var hoursValue = _react2['default'].findDOMNode(this.refs.hours).value;
      if (minutesValue === '00' && hoursValue === '00') {
        _react2['default'].findDOMNode(this.refs.minutes).value = '';
        _react2['default'].findDOMNode(this.refs.hours).value = '';
      }
    }
  }, {
    key: '_setTime',
    value: function _setTime() {
      var minutesValue = _react2['default'].findDOMNode(this.refs.minutes).value;
      var hoursValue = _react2['default'].findDOMNode(this.refs.hours).value;
      _actionsNewTimesheetActions2['default'].setTime(hoursValue, minutesValue);
    }
  }, {
    key: 'render',
    value: function render() {
      var p = this.props;
      var s = this.state;
      var hourSuffixClass = s.showHourSuffix ? 'hour-suffix' : 'hour-suffix invisible';

      return _react2['default'].createElement(
        'div',
        { className: 'time-tracker-field-wrapper' },
        _react2['default'].createElement(_InputFieldLabel2['default'], { shrinkLabel: s.shrinkLabel, error: p.error, labelName: 'Track Time' }),
        _react2['default'].createElement(
          'div',
          { className: 'tracker' },
          _react2['default'].createElement('input', {
            type: 'text',
            ref: 'hours',
            className: 'hours-input',
            maxLength: '2',
            defaultValue: '00',
            placeholder: '00',
            onFocus: this._handleInputFocus,
            onBlur: this._handleInputBlur,
            onChange: this._setTime }),
          _react2['default'].createElement(
            'span',
            null,
            ':'
          ),
          _react2['default'].createElement('input', {
            type: 'text',
            ref: 'minutes',
            className: 'minutes-input',
            maxLength: '2',
            defaultValue: '00',
            placeholder: '00',
            onFocus: this._handleInputFocus,
            onBlur: this._handleInputBlur,
            onChange: this._setTime }),
          _react2['default'].createElement(
            'small',
            { className: hourSuffixClass },
            'Hrs'
          )
        )
      );
    }
  }]);

  return TimeTrackerField;
})(_ReactTemplate3['default']);

exports['default'] = TimeTrackerField;

TimeTrackerField.propTypes = {
  error: _react2['default'].PropTypes.any
};
module.exports = exports['default'];