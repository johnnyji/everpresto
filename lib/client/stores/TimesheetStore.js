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
  onAddTimesheetCompleted: function onAddTimesheetCompleted(response) {
    this.state.timesheets.unshift(response.data.timesheet);

    // sleeps for 0.8 second to mock creation load
    setTimeout((function () {
      NewTimesheetActions.finishCreatingTimesheet();
      this.trigger(this.state);
    }).bind(this), 800);
  },
  onDeleteTimesheetCompleted: function onDeleteTimesheetCompleted(response) {
    _.remove(this.state.timesheets, function (timesheet) {
      return timesheet._id === response.data._id;
    });
    this.trigger(this.state);
  },
  onLoadTimesheetsCompleted: function onLoadTimesheetsCompleted(response) {
    this.state.timesheets = response.data.timesheets;
    this.state.componentReady = true;
    this.trigger(this.state);
  }
});

module.exports = TimesheetStore;