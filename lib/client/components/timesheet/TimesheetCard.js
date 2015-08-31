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

var _sharedReactTemplate = require('.././shared/ReactTemplate');

var _sharedReactTemplate2 = _interopRequireDefault(_sharedReactTemplate);

var _utilsDateHelper = require('../.././utils/DateHelper');

var _utilsDateHelper2 = _interopRequireDefault(_utilsDateHelper);

var _sharedIcon = require('.././shared/Icon');

var _sharedIcon2 = _interopRequireDefault(_sharedIcon);

var _actionsTimesheetActions = require('../.././actions/TimesheetActions');

var _actionsTimesheetActions2 = _interopRequireDefault(_actionsTimesheetActions);

var TimesheetCard = (function (_ReactTemplate) {
  _inherits(TimesheetCard, _ReactTemplate);

  function TimesheetCard(props) {
    _classCallCheck(this, TimesheetCard);

    _get(Object.getPrototypeOf(TimesheetCard.prototype), 'constructor', this).call(this, props);
    this.state = { viewNote: false, showOptions: false };
    this._bindFunctions('_toggleOptions', '_toggleViewNote', '_onEditTimesheet', '_onDeleteTimesheet');
  }

  _createClass(TimesheetCard, [{
    key: '_toggleOptions',
    value: function _toggleOptions() {
      this.setState({ showOptions: !this.state.showOptions });
    }
  }, {
    key: '_toggleViewNote',
    value: function _toggleViewNote() {
      this.setState({ viewNote: !this.state.viewNote });
    }
  }, {
    key: '_onEditTimesheet',
    value: function _onEditTimesheet() {}
  }, {
    key: '_onDeleteTimesheet',
    value: function _onDeleteTimesheet() {
      _actionsTimesheetActions2['default'].deleteTimesheet(this.props.timesheet._id);
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
        { className: 'timesheet-card-wrapper', onMouseEnter: this._toggleOptions, onMouseLeave: this._toggleOptions },
        s.showOptions && _react2['default'].createElement(
          'ul',
          { className: 'options' },
          _react2['default'].createElement(
            'li',
            { onClick: this._onEditTimesheet },
            _react2['default'].createElement(_sharedIcon2['default'], { icon: 'create', size: '1.3rem' })
          ),
          _react2['default'].createElement(
            'li',
            { onClick: this._onDeleteTimesheet },
            _react2['default'].createElement(_sharedIcon2['default'], { icon: 'close', size: '1.3rem' })
          )
        ),
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
})(_sharedReactTemplate2['default']);

exports['default'] = TimesheetCard;

TimesheetCard.propTypes = {
  timesheet: _react2['default'].PropTypes.object.isRequired
};
module.exports = exports['default'];