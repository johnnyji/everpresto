var Reflux = require('reflux');

var NewNoteActions = Reflux.createActions({
  'setTitle': {},
  'setDescription': {},
  'updateAttachments': {}
});

module.exports = NewNoteActions;