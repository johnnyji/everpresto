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
    timeTrackMethod: {
      hours: true,
      minutes: false,
    },
    timeInSeconds: null
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
  onSetTimeTrackToHrs: function() {
    this.state.timesheet.timeInSeconds = null;
    this.state.timesheet.timeTrackMethod = {
      hours: true,
      minutes: false,
    };
    this.trigger(this.state);
  },
  onSetTimeTrackToMins: function() {
    this.state.timesheet.timeInSeconds = null;
    this.state.timesheet.timeTrackMethod = {
      hours: false,
      minutes: true,
    };
    this.trigger(this.state);
  },
  onSetMins: function(minutes) {
    var valid = InputValidator.validateMins();
    if (valid) {
      this._clearInputError('timeInSeconds');
      this.state.timesheet.timeInSeconds = this._formatMinutesToSeconds(minutes);
    } else {
      this._triggerInputError('timeInSeconds', 'Please only provide numbers 0-9');
    }
    this.trigger(this.state);
  },
  onSetHrs: function(hours) {
    debugger;
    var valid = InputValidator.validateHrs();
    if (valid) {
      debugger;
      this._clearInputError('timeInSeconds');
      this.state.timesheet.timeInSeconds = this._formatHoursToSeconds(hours);
    } else {
      this._triggerInputError('timeInSeconds', 'Please only provide numbers 0-9'); 
    }
  }
});

module.exports = NewTimesheetStore;