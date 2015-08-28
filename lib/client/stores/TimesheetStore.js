'use strict';

var Reflux = require('reflux');
var _ = require('lodash');
var moment = require('moment');

var NewTimesheetActions = require('.././actions/NewTimesheetActions');
var TimesheetActions = require('.././actions/TimesheetActions');

var TimesheetStateTemplate = {
  dateBeingViewed: new Date(),
  timesheetsBeingViewed: [],
  timesheets: [],
  componentReady: false
};

var TimesheetStore = Reflux.createStore({
  init: function init() {
    this.state = _.cloneDeep(TimesheetStateTemplate);
    this.listenToMany(TimesheetActions);
  },
  getState: function getState() {
    return this.state;
  },
  onSetDateBeingViewed: function onSetDateBeingViewed(date) {
    this.state.dateBeingViewed = date;
    this.trigger(this.state);
  },
  onAddTimesheetCompleted: function onAddTimesheetCompleted(result) {
    this.state.timesheets.unshift(result.data.timesheet);

    // sleeps for 0.8 second to mock creation load
    setTimeout((function () {
      NewTimesheetActions.finishCreatingTimesheet();
      this.trigger(this.state);
    }).bind(this), 800);
  },
  onDeleteTimesheetCompleted: function onDeleteTimesheetCompleted(result) {
    _.remove(this.state.timesheets, function (timesheet) {
      return timesheet._id === result.data._id;
    });
    this.trigger(this.state);
  },
  onLoadTimesheetsCompleted: function onLoadTimesheetsCompleted(result) {
    this.state.timesheets = result.data.timesheets;
    this.state.componentReady = true;
    this.trigger(this.state);
  }
});

module.exports = TimesheetStore;