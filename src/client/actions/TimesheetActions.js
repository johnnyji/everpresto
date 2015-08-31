var Reflux = require('reflux');
var ApiCaller = require('.././utils/ApiCaller');
var apiEndpoints = require('.././apiEndpoints');

var TimesheetActions = Reflux.createActions({
  'loadTimesheets': { children: ['completed', 'failed'] },
  'addTimesheet': { children: ['completed', 'failed'] },
  'deleteTimesheet': { children: ['completed', 'failed'] },
  'setDateBeingViewed': {}
});

TimesheetActions.addTimesheet.listen(function(timesheet) {
  ApiCaller.sendAjaxRequest({
    url: apiEndpoints.timesheets.create.path,
    method: apiEndpoints.timesheets.create.method,
    data: { timesheet: timesheet }
  })
  .then(this.completed)
  .catch(this.failed);
});

TimesheetActions.loadTimesheets.listen(function() {
  ApiCaller.sendAjaxRequest({
    url: apiEndpoints.timesheets.collection.path,
    method: apiEndpoints.timesheets.collection.method
  })
  .then(this.completed)
  .catch(this.failed);
}); 

TimesheetActions.deleteTimesheet.listen(function(timesheetId) {
  ApiCaller.sendAjaxRequest({
    url: apiEndpoints.timesheets.delete.path,
    method: apiEndpoints.timesheets.delete.method,
    data: { _id: timesheetId } 
  })
  .then(this.completed)
  .catch(this.failed);
});

module.exports = TimesheetActions;