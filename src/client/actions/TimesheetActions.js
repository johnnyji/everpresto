var Reflux = require('reflux');
var ApiCaller = require('.././utils/api/ApiCaller');

var TimesheetActions = Reflux.createActions({
  'loadTimesheets': { children: ['completed', 'failed'] },
  'addTimesheet': { children: ['completed', 'failed'] },
  'deleteTimesheet': { children: ['completed', 'failed'] },
  'setDateBeingViewed': {}
});

TimesheetActions.addTimesheet.listen(function(timesheet) {
  ApiCaller.sendAjaxRequest({
    url: '/api/timesheets',
    method: 'POST',
    data: { timesheet: timesheet }
  })
  .then(this.completed)
  .catch(this.failed);
});

TimesheetActions.loadTimesheets.listen(function() {
  ApiCaller.sendAjaxRequest({
    url: '/api/timesheets',
    method: 'GET'
  })
  .then(this.completed)
  .catch(this.failed);
}); 

TimesheetActions.deleteTimesheet.listen(function(timesheetId) {
  ApiCaller.sendAjaxRequest({
    url: '/api/timesheets',
    method: 'DELETE',
    data: { _id: timesheetId } 
  })
  .then(this.completed)
  .catch(this.failed);
});

module.exports = TimesheetActions;