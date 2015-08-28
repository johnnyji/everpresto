var Reflux = require('reflux');

var NewTimesheetActions = Reflux.createActions({
  'setEmail': {},
  'setNote': {},
  'setWorkType': {},
  'setTime': {},
  'submitTimesheet': {},
  'finishCreatingTimesheet': {},
  'resetState': {}
});

module.exports = NewTimesheetActions;