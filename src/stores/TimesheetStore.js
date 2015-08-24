var Reflux = require('reflux');
var _ = require('lodash');

var NewTimesheetActions = require('.././actions/NewTimesheetActions');
var TimesheetActions = require('.././actions/TimesheetActions');

var TimesheetStateTemplate = {
  timesheets: [
    {
      email: 'johnny@johnnyji.com',
      note: null,
      workType: 'Assistant Director',
      timeInSeconds: 84527
    },
    {
      email: 'halahmeansandimporium@johnnyji.com',
      note: 'Niggas be bad all day err day',
      workType: 'Assistant Director',
      timeInSeconds: 3000
    }
  ],
};

var TimesheetStore = Reflux.createStore({
  init: function() {
    this.state = _.cloneDeep(TimesheetStateTemplate);
    this.listenToMany(TimesheetActions);
  },
  getState: function() {
    return this.state;
  },
  onAddTimesheet: function(timesheet) {
    this.state.timesheets.unshift(timesheet);

    // sleeps for 1 second to mock creation load
    setTimeout(function() {
      NewTimesheetActions.finishCreatingTimesheet();
      this.trigger(this.state);
    }.bind(this), 1000);
  }
});

module.exports = TimesheetStore;