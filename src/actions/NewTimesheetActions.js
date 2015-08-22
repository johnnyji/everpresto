var Reflux = require('reflux');

var NewTimesheetActions = Reflux.createActions([
  'setEmail',
  'setWorkType',
  'setTimeTrackToHrs',
  'setTimeTrackToMins',
  'setMins',
  'setHours'
]);

module.exports = NewTimesheetActions;