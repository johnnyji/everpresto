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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactWidgets = require('react-widgets');

var _reactWidgets2 = _interopRequireDefault(_reactWidgets);

var _sharedReactTemplate = require('.././shared/ReactTemplate');

var _sharedReactTemplate2 = _interopRequireDefault(_sharedReactTemplate);

var _actionsTimesheetActions = require('../.././actions/TimesheetActions');

var _actionsTimesheetActions2 = _interopRequireDefault(_actionsTimesheetActions);

var _sharedIcon = require('.././shared/Icon');

var _sharedIcon2 = _interopRequireDefault(_sharedIcon);

var _utilsDateHelper = require('../.././utils/DateHelper');

var _utilsDateHelper2 = _interopRequireDefault(_utilsDateHelper);

var DateTimePicker = _reactWidgets2['default'].DateTimePicker;
var Calender = _reactWidgets2['default'].Calender;

var DateNavbar = (function (_ReactTemplate) {
  _inherits(DateNavbar, _ReactTemplate);

  function DateNavbar(props) {
    _classCallCheck(this, DateNavbar);

    _get(Object.getPrototypeOf(DateNavbar.prototype), 'constructor', this).call(this, props);
    this.state = { showCalenderSelect: false };
    this._bindFunctions('_setDateBeingViewedFromCalender', '_setDateBeingViewed', '_showPrevWeek', '_showNextWeek', '_toggleCalenderSelect');
  }

  _createClass(DateNavbar, [{
    key: '_setDateBeingViewedFromCalender',
    value: function _setDateBeingViewedFromCalender(date) {
      _actionsTimesheetActions2['default'].setDateBeingViewed(date);
      this.setState({ showCalenderSelect: false });
    }
  }, {
    key: '_setDateBeingViewed',
    value: function _setDateBeingViewed(e) {
      var selectedDate = new Date(e.target.dataset.date);
      _actionsTimesheetActions2['default'].setDateBeingViewed(selectedDate);
    }
  }, {
    key: '_showPrevWeek',
    value: function _showPrevWeek() {
      var prevWeek = _utilsDateHelper2['default'].getPreviousWeekFrom(this.props.dateBeingViewed);
      _actionsTimesheetActions2['default'].setDateBeingViewed(prevWeek);
    }
  }, {
    key: '_showNextWeek',
    value: function _showNextWeek() {
      var nextWeek = _utilsDateHelper2['default'].getNextWeekFrom(this.props.dateBeingViewed);
      _actionsTimesheetActions2['default'].setDateBeingViewed(nextWeek);
    }
  }, {
    key: '_toggleCalenderSelect',
    value: function _toggleCalenderSelect() {
      this.setState({ showCalenderSelect: !this.state.showCalenderSelect });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var p = this.props;
      var s = this.state;
      var weekInDates = _utilsDateHelper2['default'].getWeekOf(p.dateBeingViewed);
      var weekAcronyms = _utilsDateHelper2['default'].getWeekInAcronyms();
      var calenderSelectClass = s.showCalenderSelect ? 'active' : '';
      var header = undefined;

      var weekdayList = _lodash2['default'].map(weekAcronyms, (function (dayAcronym, i) {
        var todayIsDateBeingViewed = dayAcronym === _utilsDateHelper2['default'].formatWeekdayAcronym(p.dateBeingViewed);
        var dayObject = weekInDates[i];
        if (todayIsDateBeingViewed) {
          return _react2['default'].createElement(
            'li',
            { className: 'active-day', key: i },
            dayAcronym
          );
        }
        return _react2['default'].createElement(
          'li',
          { 'data-date': dayObject, onClick: _this._setDateBeingViewed, key: i },
          dayAcronym
        );
      }).bind(this));

      if (s.showCalenderSelect) {
        header = _react2['default'].createElement(
          'div',
          { className: 'calender-container' },
          _react2['default'].createElement(DateTimePicker, {
            defaultValue: p.dateBeingViewed,
            editFormat: 'd',
            format: 'MMM dd yyyy',
            time: false,
            onChange: this._setDateBeingViewedFromCalender
          })
        );
      } else {
        header = _react2['default'].createElement(
          'h2',
          { className: 'week-being-viewed', onClick: this._toggleCalenderSelect },
          p.weekBeingViewed
        );
      }

      return _react2['default'].createElement(
        'nav',
        { className: 'date-navbar' },
        _react2['default'].createElement(
          'div',
          { onClick: this._showPrevWeek },
          _react2['default'].createElement(_sharedIcon2['default'], { icon: 'chevron-left', size: '3.25rem', iconClass: 'prev-week pull-left' })
        ),
        _react2['default'].createElement(
          'div',
          { className: 'navbar-content' },
          _react2['default'].createElement(
            'div',
            { className: 'calender-icon-container ' + calenderSelectClass, onClick: this._toggleCalenderSelect },
            _react2['default'].createElement(_sharedIcon2['default'], { icon: 'today', size: '1.8rem' })
          ),
          header,
          _react2['default'].createElement(
            'ul',
            { className: 'week' },
            weekdayList
          )
        ),
        _react2['default'].createElement(
          'div',
          { onClick: this._showNextWeek },
          _react2['default'].createElement(_sharedIcon2['default'], { icon: 'chevron-right', size: '3.25rem', iconClass: 'next-week pull-right' })
        )
      );
    }
  }]);

  return DateNavbar;
})(_sharedReactTemplate2['default']);

exports['default'] = DateNavbar;

DateNavbar.propTypes = {
  weekBeingViewed: _react2['default'].PropTypes.string.isRequired
};
module.exports = exports['default'];