var Reflux = require('reflux');

var NewTimesheetActions = Reflux.createActions([
  'setEmail',
  'setWorkType',
  'setTime',
  'submitTimesheet',
]);

module.exports = NewTimesheetActions;