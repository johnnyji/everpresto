'use strict';

var Reflux = require('reflux');
var ApiCaller = require('.././utils/ApiCaller');
var apiEndpoints = require('.././apiEndpoints');

var NewNoteActions = Reflux.createActions({
  'setTitle': {},
  'setDescription': {},
  'updateAttachments': {},
  'submitNote': { children: ['completed', 'failed'] }
});

NewNoteActions.submitNote.listen(function () {
  ApiCaller.sendAjaxRequest({
    url: apiEndpoints.notes.create.path,
    method: apiEndpoints.notes.create.method
  }).then(this.completed)['catch'](this.failed);
});

module.exports = NewNoteActions;