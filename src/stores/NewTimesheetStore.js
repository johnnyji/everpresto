var Reflux = require('reflux');
var _ = require('lodash');

var TimeFormatterMixin = require('./mixins/TimeFormatterMixin');
var ErrorHandlerMixin = require('./mixins/ErrorHandlerMixin');
var InputValidator = require('.././utils/InputValidator');

var NewTimesheetActions = require('.././actions/NewTimesheetActions');

var NewTimesheetStateTemplate = {
  timesheet: {
    email: null,
    workType: null,
    timeInSeconds: null,
  },
  errors: {
    timeInSeconds: null,
    email: null,
    workType: null,
  },
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
  onSetTime: function(hours, minutes) {
    var valid = InputValidator.validateStringPresence(hours, minutes);
    valid = InputValidator.validateLength(2, hours, minutes);

    if (valid) {
      this._clearInputError('timeInSeconds');
      this.state.timesheet.timeInSeconds = 
        this._formatHoursToSeconds(hours) + this._formatMinutesToSeconds(minutes);
    } else {
      this._triggerInputError('timeInSeconds', 'Please fill out your work duration.');
    }
    this.trigger(this.state);
  },
  onSubmitTimesheet: function() {
    
  }
});

module.exports = NewTimesheetStore;