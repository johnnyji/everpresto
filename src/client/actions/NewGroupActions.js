var Reflux = require('reflux');

var NewGroupActions = Reflux.createActions({
  'incrementActiveFormPhaseIndex': {},
  'setGroupCreator': {},
  'handleNameChange': {}
});

module.exports = NewGroupActions;