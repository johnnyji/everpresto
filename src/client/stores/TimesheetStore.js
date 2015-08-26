var Reflux = require('reflux');
var _ = require('lodash');
var moment = require('moment');

var NewTimesheetActions = require('.././actions/NewTimesheetActions');
var TimesheetActions = require('.././actions/TimesheetActions');

var TimesheetStateTemplate = {
  dateBeingViewed: new Date,
  timesheetsBeingViewed: [],
  timesheets: [],
};

var TimesheetStore = Reflux.createStore({
  init: function() {
    this.state = _.cloneDeep(TimesheetStateTemplate);
    this.listenToMany(TimesheetActions);
  },
  getState: function() {
    return this.state;
  },
  onSetDateBeingViewed: function(date) {
    this.state.dateBeingViewed = date;
    this.trigger(this.state);
  },
  onAddTimesheet: function(timesheet) {
    this.state.timesheets.unshift(timesheet);

    // sleeps for 1 second to mock creation load
    setTimeout(function() {
      NewTimesheetActions.finishCreatingTimesheet();
      this.trigger(this.state);
    }.bind(this), 1000);
  },
  onLoadTimesheetsCompleted: function(result) {
    debugger;
  }
});

module.exports = TimesheetStore;