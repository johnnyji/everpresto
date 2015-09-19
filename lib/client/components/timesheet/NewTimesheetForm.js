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

var _sharedIcon = require('.././shared/Icon');

var _sharedIcon2 = _interopRequireDefault(_sharedIcon);

var _sharedExitFormIcon = require('.././shared/ExitFormIcon');

var _sharedExitFormIcon2 = _interopRequireDefault(_sharedExitFormIcon);

var _sharedSpinner = require('.././shared/Spinner');

var _sharedSpinner2 = _interopRequireDefault(_sharedSpinner);

var _sharedInputField = require('.././shared/InputField');

var _sharedInputField2 = _interopRequireDefault(_sharedInputField);

var _sharedTextField = require('.././shared/TextField');

var _sharedTextField2 = _interopRequireDefault(_sharedTextField);

var _sharedSelectBox = require('.././shared/SelectBox');

var _sharedSelectBox2 = _interopRequireDefault(_sharedSelectBox);

var _sharedTimeTrackerField = require('.././shared/TimeTrackerField');

var _sharedTimeTrackerField2 = _interopRequireDefault(_sharedTimeTrackerField);

var _PostTimesheetSubmissionView = require('./PostTimesheetSubmissionView');

var _PostTimesheetSubmissionView2 = _interopRequireDefault(_PostTimesheetSubmissionView);

var _actionsAppActions = require('../.././actions/AppActions');

var _actionsAppActions2 = _interopRequireDefault(_actionsAppActions);

var _actionsNewTimesheetActions = require('../.././actions/NewTimesheetActions');

var _actionsNewTimesheetActions2 = _interopRequireDefault(_actionsNewTimesheetActions);

var _storesNewTimesheetStore = require('../.././stores/NewTimesheetStore');

var _storesNewTimesheetStore2 = _interopRequireDefault(_storesNewTimesheetStore);

var NewTimesheetForm = (function (_ReactTemplate) {
  _inherits(NewTimesheetForm, _ReactTemplate);

  function NewTimesheetForm(props) {
    _classCallCheck(this, NewTimesheetForm);

    _get(Object.getPrototypeOf(NewTimesheetForm.prototype), 'constructor', this).call(this, props);
    this.state = this._getInitialState();
    this._bindFunctions('_getInitialState', '_updateState', '_onChangeEmail', '_onChangeNote', '_onSelectWorkType', '_onSubmitTimesheet', '_regenerateForm', '_clearForm');
  }

  _createClass(NewTimesheetForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._unsubscribe = _storesNewTimesheetStore2['default'].listen(this._updateState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._unsubscribe();
    }
  }, {
    key: '_getInitialState',
    value: function _getInitialState() {
      var state = _storesNewTimesheetStore2['default'].getState();
      return {
        timesheet: state.timesheet,
        errors: state.errors,
        creatingTimesheet: state.creatingTimesheet,
        postCreateTimesheet: state.postCreateTimesheet
      };
    }
  }, {
    key: '_updateState',
    value: function _updateState(state) {
      this.setState({
        timesheet: state.timesheet,
        errors: state.errors,
        creatingTimesheet: state.creatingTimesheet,
        postCreateTimesheet: state.postCreateTimesheet
      });
    }
  }, {
    key: '_onChangeEmail',
    value: function _onChangeEmail(e) {
      _actionsNewTimesheetActions2['default'].setEmail(e.target.value);
    }
  }, {
    key: '_onChangeNote',
    value: function _onChangeNote(e) {
      _actionsNewTimesheetActions2['default'].setNote(e.target.value);
    }
  }, {
    key: '_onSelectWorkType',
    value: function _onSelectWorkType(workType) {
      _actionsNewTimesheetActions2['default'].setWorkType(workType);
    }
  }, {
    key: '_onSubmitTimesheet',
    value: function _onSubmitTimesheet() {
      _actionsNewTimesheetActions2['default'].submitTimesheet(this.state.timesheet);
    }
  }, {
    key: '_regenerateForm',
    value: function _regenerateForm() {
      _actionsNewTimesheetActions2['default'].resetState();
    }
  }, {
    key: '_clearForm',
    value: function _clearForm() {
      this.refs.email.refs.input.getDOMNode().value = '';
      // This targets the DropdownList component, finds the field that represents the input and sets that field's value to empty
      this.refs.workType.refs.select.getDOMNode().getElementsByClassName('rw-input')[0].innerHTML = this.props.workTypeDefaultValue;

      this.refs.notes.refs.textarea.getDOMNode().value = '';
      this.refs.tracker.refs.hours.getDOMNode().value = this.props.hoursInputDefaultValue;
      this.refs.tracker.refs.minutes.getDOMNode().value = this.props.minutesInputDefaultValue;
      _actionsNewTimesheetActions2['default'].resetState();
    }
  }, {
    key: '_exitForm',
    value: function _exitForm() {
      _actionsAppActions2['default'].toggleModal();
    }
  }, {
    key: 'render',
    value: function render() {
      var p = this.props;
      var s = this.state;
      var noErrors = _lodash2['default'].isNull(s.errors.workType) && _lodash2['default'].isNull(s.errors.email) && _lodash2['default'].isNull(s.errors.timeInSeconds);
      var fieldsFilled = !_lodash2['default'].isNull(s.timesheet.email) && !_lodash2['default'].isNull(s.timesheet.workType) && !_lodash2['default'].isNull(s.timesheet.timeInSeconds);
      var submitButton = undefined;

      if (noErrors && fieldsFilled) {
        submitButton = _react2['default'].createElement(
          'button',
          { className: 'button', onClick: this._onSubmitTimesheet },
          'Submit Timesheet'
        );
      } else {
        submitButton = _react2['default'].createElement(
          'button',
          { className: 'button inactive-button' },
          'Fill the fields'
        );
      }

      if (s.creatingTimesheet) {
        return _react2['default'].createElement(
          'div',
          { className: 'new-timesheet-form-wrapper' },
          _react2['default'].createElement(_sharedSpinner2['default'], null)
        );
      }

      if (s.postCreateTimesheet) {
        return _react2['default'].createElement(
          'div',
          { className: 'new-timesheet-form-wrapper' },
          _react2['default'].createElement(_sharedExitFormIcon2['default'], { onExitClick: this._exitForm }),
          _react2['default'].createElement(_PostTimesheetSubmissionView2['default'], {
            timesheet: s.timesheet,
            regenerateForm: this._regenerateForm
          })
        );
      }

      return _react2['default'].createElement(
        'div',
        { className: 'new-timesheet-form-wrapper' },
        _react2['default'].createElement(_sharedExitFormIcon2['default'], { onExitClick: this._exitForm }),
        _react2['default'].createElement(
          'div',
          { className: 'subform subform-left' },
          _react2['default'].createElement(_sharedInputField2['default'], {
            ref: 'email',
            label: 'Email Address',
            type: 'email',
            inputPlaceholder: 'email@domain.com',
            error: s.errors.email,
            onInputChange: this._onChangeEmail
          }),
          _react2['default'].createElement(_sharedSelectBox2['default'], {
            ref: 'workType',
            options: p.workTypes,
            error: s.errors.workType,
            labelName: 'Work Type',
            defaultValue: p.workTypeDefaultValue,
            onSelectChange: this._onSelectWorkType
          }),
          _react2['default'].createElement(_sharedTextField2['default'], {
            ref: 'notes',
            label: 'Message (optional)',
            inputPlaceholder: 'Leave a message...',
            onInputChange: this._onChangeNote
          })
        ),
        _react2['default'].createElement(
          'div',
          { className: 'subform subform-right' },
          _react2['default'].createElement(_sharedTimeTrackerField2['default'], {
            ref: 'tracker',
            error: s.errors.timeInSeconds
          }),
          submitButton
        ),
        _react2['default'].createElement(
          'small',
          { className: 'clear-form-button', onClick: this._clearForm },
          'Reset Form'
        )
      );
    }
  }]);

  return NewTimesheetForm;
})(_sharedReactTemplate2['default']);

exports['default'] = NewTimesheetForm;

NewTimesheetForm.propTypes = {
  workTypes: _react2['default'].PropTypes.array.isRequired
};

NewTimesheetForm.defaultProps = {
  hoursInputDefaultValue: '00',
  minutesInputDefaultValue: '00',
  workTypeDefaultValue: 'Select work type'
};
module.exports = exports['default'];