var Reflux = require('reflux');
var _ = require('lodash');

var TimesheetActions = require('.././actions/TimesheetActions');

var TimesheetStateTemplate = {
  timesheets: [],
};

var TimesheetStore = Reflux.createStore({
  init: function() {
    this.state = _.clone(TimesheetStateTemplate);
    this.listenToMany(TimesheetActions);
  },
  getState: function() {
    return this.state;
  }
});

module.exports = TimesheetStore;