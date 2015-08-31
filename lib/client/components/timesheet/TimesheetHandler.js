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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _sharedAuthenticatedComponent = require('.././shared/AuthenticatedComponent');

var _sharedAuthenticatedComponent2 = _interopRequireDefault(_sharedAuthenticatedComponent);

var _sharedReactTemplate = require('.././shared/ReactTemplate');

var _sharedReactTemplate2 = _interopRequireDefault(_sharedReactTemplate);

var _dateDateNavbar = require('.././date/DateNavbar');

var _dateDateNavbar2 = _interopRequireDefault(_dateDateNavbar);

var _timesheetNewTimesheetButton = require('.././timesheet/NewTimesheetButton');

var _timesheetNewTimesheetButton2 = _interopRequireDefault(_timesheetNewTimesheetButton);

var _timesheetPreviousTimesheets = require('.././timesheet/PreviousTimesheets');

var _timesheetPreviousTimesheets2 = _interopRequireDefault(_timesheetPreviousTimesheets);

var _utilsDateHelper = require('../.././utils/DateHelper');

var _utilsDateHelper2 = _interopRequireDefault(_utilsDateHelper);

var _actionsTimesheetActions = require('../.././actions/TimesheetActions');

var _actionsTimesheetActions2 = _interopRequireDefault(_actionsTimesheetActions);

var _storesTimesheetStore = require('../.././stores/TimesheetStore');

var _storesTimesheetStore2 = _interopRequireDefault(_storesTimesheetStore);

exports['default'] = (0, _sharedAuthenticatedComponent2['default'])((function (_ReactTemplate) {
  _inherits(TimesheetHandler, _ReactTemplate);

  function TimesheetHandler(props) {
    _classCallCheck(this, TimesheetHandler);

    _get(Object.getPrototypeOf(TimesheetHandler.prototype), 'constructor', this).call(this, props);
    this.state = this._getInitialState();
    this._bindFunctions('_getInitialState', '_updateState');
  }

  _createClass(TimesheetHandler, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _actionsTimesheetActions2['default'].loadTimesheets();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._unsubscribe = _storesTimesheetStore2['default'].listen(this._updateState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._unsubscribe();
    }
  }, {
    key: '_getInitialState',
    value: function _getInitialState() {
      var state = _storesTimesheetStore2['default'].getState();
      return {
        dateBeingViewed: state.dateBeingViewed,
        timesheets: state.timesheets,
        componentReady: state.componentReady
      };
    }
  }, {
    key: '_updateState',
    value: function _updateState(state) {
      this.setState({
        dateBeingViewed: state.dateBeingViewed,
        timesheets: state.timesheets,
        componentReady: state.componentReady
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var s = this.state;
      var p = this.props;
      var weekBeingViewed = _utilsDateHelper2['default'].formatWeekDurationFromDate(s.dateBeingViewed);
      var formattedDateBeingViewed = _utilsDateHelper2['default'].formatHeaderDate(s.dateBeingViewed);
      var timesheetsBeingViewed = _lodash2['default'].filter(s.timesheets, (function (timesheet) {
        return _utilsDateHelper2['default'].formatDate(timesheet.createdAt).toLocaleDateString() === _utilsDateHelper2['default'].formatDate(s.dateBeingViewed).toLocaleDateString();
      }).bind(this));

      return _react2['default'].createElement(
        'div',
        { className: 'timesheet-handler-wrapper' },
        _react2['default'].createElement(_dateDateNavbar2['default'], {
          weekBeingViewed: weekBeingViewed,
          dateBeingViewed: s.dateBeingViewed
        }),
        _react2['default'].createElement(_timesheetNewTimesheetButton2['default'], null),
        _react2['default'].createElement(_timesheetPreviousTimesheets2['default'], {
          timesheets: timesheetsBeingViewed,
          dateBeingViewed: formattedDateBeingViewed
        })
      );
    }
  }]);

  return TimesheetHandler;
})(_sharedReactTemplate2['default']));

TimesheetHandler.propTypes = {
  currentUser: _react2['default'].PropTypes.any,
  apiToken: _react2['default'].PropTypes.any
};
module.exports = exports['default'];