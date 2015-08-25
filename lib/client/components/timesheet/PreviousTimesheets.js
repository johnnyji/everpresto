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

var _sharedReactTemplate = require('.././shared/ReactTemplate');

var _sharedReactTemplate2 = _interopRequireDefault(_sharedReactTemplate);

var _TimesheetCard = require('./TimesheetCard');

var _TimesheetCard2 = _interopRequireDefault(_TimesheetCard);

var PreviousTimesheets = (function (_ReactTemplate) {
  _inherits(PreviousTimesheets, _ReactTemplate);

  function PreviousTimesheets(props) {
    _classCallCheck(this, PreviousTimesheets);

    _get(Object.getPrototypeOf(PreviousTimesheets.prototype), 'constructor', this).call(this, props);
  }

  _createClass(PreviousTimesheets, [{
    key: 'render',
    value: function render() {
      var p = this.props;

      if (p.timesheets.length === 0) {
        return _react2['default'].createElement(
          'div',
          { className: 'previous-timesheets-wrapper' },
          _react2['default'].createElement(
            'div',
            { className: 'timesheets-container' },
            _react2['default'].createElement(
              'h2',
              null,
              p.dateBeingViewed
            ),
            _react2['default'].createElement(
              'div',
              { className: 'no-timesheets-container' },
              _react2['default'].createElement(
                'h3',
                null,
                'No Timesheets Yet.'
              ),
              _react2['default'].createElement(
                'p',
                null,
                'Go create one. They\'re free!'
              )
            )
          )
        );
      }

      var previousTimesheets = _lodash2['default'].map(p.timesheets, function (timesheet, i) {
        return _react2['default'].createElement(_TimesheetCard2['default'], { key: i, timesheet: timesheet });
      });

      return _react2['default'].createElement(
        'div',
        { className: 'previous-timesheets-wrapper' },
        _react2['default'].createElement(
          'div',
          { className: 'timesheets-container' },
          _react2['default'].createElement(
            'h2',
            null,
            p.dateBeingViewed
          ),
          previousTimesheets
        )
      );
    }
  }]);

  return PreviousTimesheets;
})(_sharedReactTemplate2['default']);

exports['default'] = PreviousTimesheets;

PreviousTimesheets.propTypes = {
  dateBeingViewed: _react2['default'].PropTypes.string.isRequired
};
module.exports = exports['default'];