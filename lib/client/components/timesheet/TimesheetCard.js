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

var _utilsDateHelper = require('../.././utils/DateHelper');

var _utilsDateHelper2 = _interopRequireDefault(_utilsDateHelper);

var TimesheetCard = (function (_React$Component) {
  _inherits(TimesheetCard, _React$Component);

  function TimesheetCard(props) {
    _classCallCheck(this, TimesheetCard);

    _get(Object.getPrototypeOf(TimesheetCard.prototype), 'constructor', this).call(this, props);
    this.state = { viewNote: false };
    this._toggleViewNote = this._toggleViewNote.bind(this);
  }

  _createClass(TimesheetCard, [{
    key: '_toggleViewNote',
    value: function _toggleViewNote() {
      this.setState({ viewNote: !this.state.viewNote });
    }
  }, {
    key: 'render',
    value: function render() {
      var p = this.props;
      var s = this.state;

      var timesheet = p.timesheet;
      var previewNote = timesheet.note && !s.viewNote;
      var viewNote = timesheet.note && s.viewNote;
      var convertedTime = _utilsDateHelper2['default'].convertSecondsToHoursAndMinutes(timesheet.timeInSeconds);

      return _react2['default'].createElement(
        'div',
        { className: 'timesheet-card-wrapper' },
        _react2['default'].createElement(
          'div',
          { className: 'left' },
          _react2['default'].createElement(
            'div',
            { className: 'time-display' },
            _react2['default'].createElement(
              'span',
              null,
              convertedTime.hours
            ),
            _react2['default'].createElement(
              'small',
              null,
              'Hrs'
            ),
            _react2['default'].createElement(
              'span',
              null,
              convertedTime.minutes
            ),
            _react2['default'].createElement(
              'small',
              null,
              'Mins'
            )
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'right' },
          _react2['default'].createElement(
            'p',
            { className: 'employee-name' },
            _react2['default'].createElement(
              'strong',
              null,
              timesheet.email
            )
          ),
          _react2['default'].createElement(
            'p',
            { className: 'work-type' },
            _react2['default'].createElement(
              'span',
              { className: 'prefix' },
              'Job Type:'
            ),
            timesheet.workType
          ),
          previewNote && _react2['default'].createElement(
            'p',
            { className: 'note', onClick: this._toggleViewNote },
            _react2['default'].createElement(
              'span',
              { className: 'prefix' },
              'Message:'
            ),
            timesheet.note.substring(0, 30) + '...'
          ),
          viewNote && _react2['default'].createElement(
            'p',
            { className: 'note', onClick: this._toggleViewNote },
            _react2['default'].createElement(
              'span',
              { className: 'prefix' },
              'Message:'
            ),
            timesheet.note
          )
        )
      );
    }
  }]);

  return TimesheetCard;
})(_react2['default'].Component);

exports['default'] = TimesheetCard;

TimesheetCard.propTypes = {
  timesheet: _react2['default'].PropTypes.object.isRequired
};
module.exports = exports['default'];