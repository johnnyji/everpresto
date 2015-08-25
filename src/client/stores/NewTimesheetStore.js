var Reflux = require('reflux');
var _ = require('lodash');

var TimeFormatterMixin = require('./mixins/TimeFormatterMixin');
var ErrorHandlerMixin = require('./mixins/ErrorHandlerMixin');
var InputValidator = require('.././utils/InputValidator');
var CustomValidator = require('.././utils/CustomValidator');

var NewTimesheetActions = require('.././actions/NewTimesheetActions');
var TimesheetActions = require('.././actions/TimesheetActions');

var NewTimesheetStateTemplate = {
  timesheet: {
    email: null,
    note: null,
    workType: null,
    timeInSeconds: null,
    createdAt: null
  },
  errors: {
    timeInSeconds: null,
    email: null,
    workType: null,
  },
  creatingTimesheet: false,
  postCreateTimesheet: false
};

var NewTimesheetStore = Reflux.createStore({
  mixins: [ErrorHandlerMixin, TimeFormatterMixin],
  init: function() {
    this.state = _.cloneDeep(NewTimesheetStateTemplate);
    this.listenToMany(NewTimesheetActions);
  },
  getState: function() {
    return this.state;
  },
  onSetWorkType: function(workType) {
    this.state.timesheet.workType = workType;
    this.trigger(this.state);
  },
  onSetEmail: function(email) {
    var validation = InputValidator.validateEmail(null, email);

    if (validation.valid) {
      this._clearInputError('email');
      this.state.timesheet.email = email;
    } else {
      this._triggerInputError('email', validation.message);
    }
    this.trigger(this.state);
  },
  onSetNote: function(note) {
    this.state.timesheet.note = note;
    this.trigger(this.state);
  },
  onSetTime: function(hours, minutes) {
    var valid = true;
    var validations = [
      InputValidator.validateStringPresence('Please fill out your work duration', hours, minutes),
      InputValidator.validateIntegerOnly(null, hours, minutes),
      InputValidator.validateLength('Please fill out all digits (ie. 00:00)', 2, hours, minutes),
      CustomValidator.validateCorrectTimeInput(hours, minutes)
    ];

    for (var i = 0; i < validations.length; i++) {
      var result = validations[i];
      if (!result.valid) {
        valid = false;
        this._triggerInputError('timeInSeconds', result.message);
        break; // exits the validations loop if theres an error caught
      }
    };

    if (valid) { 
      this._clearInputError('timeInSeconds');
      this.state.timesheet.timeInSeconds = 
        this._formatHoursToSeconds(hours) + this._formatMinutesToSeconds(minutes);
      this.trigger(this.state);
    }
  },
  onSubmitTimesheet: function() {
    this.state.creatingTimesheet = true;
    this.state.timesheet.createdAt = new Date(Date.now());
    TimesheetActions.addTimesheet(this.state.timesheet);
    this.trigger(this.state);
  },
  onFinishCreatingTimesheet: function() {
    this.state.creatingTimesheet = false;
    this.state.postCreateTimesheet = true;
    this.trigger(this.state);
  },
  onResetState: function() {
    this.state = _.cloneDeep(NewTimesheetStateTemplate);
    this.trigger(this.state);
  }
});

module.exports = NewTimesheetStore;