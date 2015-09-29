var Reflux = require('reflux');
var ApiCaller = require('.././utils/ApiCaller');
var apiEndpoints = require('.././apiEndpoints');

var NewNoteActions = Reflux.createActions({
  'setUserId': {},
  'setTitle': {},
  'setDescription': {},
  'updateAttachments': {},
  'submitNote': { children: ['completed', 'failed'] }
});

NewNoteActions.submitNote.listen(function(data) {
  ApiCaller.sendAjaxRequest({
    url: apiEndpoints.notes.create.path,
    method: apiEndpoints.notes.create.method,
    data: { note: data }
  })
  .then(this.completed)
  .catch(this.failed);
});

module.exports = NewNoteActions;