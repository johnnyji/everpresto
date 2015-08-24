var Reflux = require('reflux');

var TimesheetActions = Reflux.createActions([
  'addTimesheet',
  'setDateBeingViewed'
]);

module.exports = TimesheetActions;