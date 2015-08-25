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

var _sharedReactTemplate = require('.././shared/ReactTemplate');

var _sharedReactTemplate2 = _interopRequireDefault(_sharedReactTemplate);

var _sharedIcon = require('.././shared/Icon');

var _sharedIcon2 = _interopRequireDefault(_sharedIcon);

var PostTimesheetSubmissionView = (function (_ReactTemplate) {
  _inherits(PostTimesheetSubmissionView, _ReactTemplate);

  function PostTimesheetSubmissionView(props) {
    _classCallCheck(this, PostTimesheetSubmissionView);

    _get(Object.getPrototypeOf(PostTimesheetSubmissionView.prototype), 'constructor', this).call(this, props);
    this._bindFunctions('_onRegenerateForm', '_formatSecondsToHoursAndMinutes');
  }

  _createClass(PostTimesheetSubmissionView, [{
    key: '_onRegenerateForm',
    value: function _onRegenerateForm() {
      this.props.regenerateForm();
    }
  }, {
    key: '_formatSecondsToHoursAndMinutes',
    value: function _formatSecondsToHoursAndMinutes() {
      var momentSeconds = _moment2['default'].duration(this.props.timesheet.timeInSeconds, 'seconds');
      var hours = Math.floor(momentSeconds.asHours());
      var minutes = Math.floor(momentSeconds.asMinutes()) - hours * 60;
      return hours + 'hrs and ' + minutes + 'mins';
    }
  }, {
    key: 'render',
    value: function render() {
      var p = this.props;
      var timeLogged = this._formatSecondsToHoursAndMinutes();

      return _react2['default'].createElement(
        'div',
        { className: 'post-timesheet-submission-view-wrapper' },
        _react2['default'].createElement(_sharedIcon2['default'], { icon: 'done', size: '5rem' }),
        _react2['default'].createElement(
          'h2',
          null,
          'Thanks ',
          _react2['default'].createElement(
            'strong',
            null,
            p.timesheet.email,
            '!'
          )
        ),
        _react2['default'].createElement(
          'p',
          null,
          'You have logged ',
          timeLogged,
          ' of work today.'
        ),
        _react2['default'].createElement(
          'button',
          { className: 'button', onClick: this._onRegenerateForm },
          'Submit Another!'
        )
      );
    }
  }]);

  return PostTimesheetSubmissionView;
})(_sharedReactTemplate2['default']);

exports['default'] = PostTimesheetSubmissionView;

PostTimesheetSubmissionView.propTypes = {
  timesheet: _react2['default'].PropTypes.object.isRequired,
  regenerateForm: _react2['default'].PropTypes.func.isRequired
};
module.exports = exports['default'];