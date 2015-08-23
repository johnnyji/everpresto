var Reflux = require('reflux');
var _ = require('lodash');

var TimeFormatterMixin = require('./mixins/TimeFormatterMixin');
var ErrorHandlerMixin = require('./mixins/ErrorHandlerMixin');
var InputValidator = require('.././utils/InputValidator');

var NewTimesheetActions = require('.././actions/NewTimesheetActions');
var TimesheetActions = require('.././actions/TimesheetActions');

var NewTimesheetStateTemplate = {
  timesheet: {
    email: null,
    note: null,
    workType: null,
    timeInSeconds: null,
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
    this.state = _.clone(NewTimesheetStateTemplate);
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
    var valid = InputValidator.validateEmail(email);

    if (valid) {
      this._clearInputError('email');
      this.state.timesheet.email = email;
    } else {
      this._triggerInputError('email', 'Invalid email format.');
    }
    this.trigger(this.state);
  },
  onSetNote: function(note) {
    this.state.timesheet.note = note;
    this.trigger(this.state);
  },
  onSetTime: function(hours, minutes) {
    Promise.all([
      InputValidator.validateStringPresence(hours, minutes),
      InputValidator.validateIntegerOnly(hours, minutes),
      InputValidator.validateLength(2, hours, minutes)
    ]).then(function(result) {
      var exists = result[0];
      var isNumbers = result[1];
      var isCorrectLength = result[2];

      if (!exists) { 
        return this._triggerInputError('timeInSeconds', 'Please fill out your work duration.');
      }
      if (!isNumbers) {
        return this._triggerInputError('timeInSeconds', 'Please only enter numbers 0-9.');
      }
      if (!isCorrectLength) {
        return this._triggerInputError('timeInSeconds', 'Please fill out all digits (ie. 00:00)'); 
      }
      this._clearInputError('timeInSeconds');
      this.state.timesheet.timeInSeconds = 
        this._formatHoursToSeconds(hours) + this._formatMinutesToSeconds(minutes);
      this.trigger(this.state);      
    }.bind(this));
  },
  onSubmitTimesheet: function() {
    this.state.creatingTimesheet = true;
    TimesheetActions.addTimesheet(this.state.timesheet);
    this.trigger(this.state);
  },
  onFinishCreatingTimesheet: function() {
    this.state.creatingTimesheet = false;
    this.state.postCreateTimesheet = true;
    this.trigger(this.state);
  },
  onResetState: function() {
    this.state = _.clone(NewTimesheetStateTemplate);
    this.trigger(this.state);
  }
});

module.exports = NewTimesheetStore;