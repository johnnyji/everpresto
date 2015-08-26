'use strict';

var Reflux = require('reflux');
var TimesheetCaller = require('.././utils/api/TimesheetCaller');

var Api = new TimesheetCaller();

var TimesheetActions = Reflux.createActions({
  'loadTimesheets': { children: ['completed', 'failed'] },
  'addTimesheet': {},
  'setDateBeingViewed': {}
});

TimesheetActions.loadTimesheets.listen(function () {
  Api.loadTimesheets().then(this.completed)['catch'](this.failed);
});

module.exports = TimesheetActions;