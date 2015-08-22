var Reflux = require('reflux');
var _ = require('lodash');

var ErrorHandlerMixin = require('./mixins/ErrorHandlerMixin');
var InputValidator = require('.././utils/InputValidator');
var NewTimesheetActions = require('.././actions/NewTimesheetActions');

var NewTimesheetStateTemplate = {
  timesheet: {
    email: null,
    workType: null
  },
  errors: {
    email: null,
    workType: null
  }
};

var NewTimesheetStore = Reflux.createStore({
  mixins: [ErrorHandlerMixin],
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
  }
});

module.exports = NewTimesheetStore;