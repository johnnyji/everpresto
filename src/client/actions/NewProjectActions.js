var Reflux = require('reflux');

var ProjectActions = Reflux.createActions({
  'setTitle': {},
  'setDescription': {},
  'setMinBudget': {},  
  'setMaxBudget': {}
});

module.exports = ProjectActions;