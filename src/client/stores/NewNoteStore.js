var Reflux = require('reflux');
var _ = require('lodash');
var NewNoteActions = require('.././actions/NewNoteActions');

var NewNoteStateTemplate = {
  note: {
    title: 'Untitled',
    description: null,
    attachments: []
  },
  errors: {}
};

var NewNoteStore = Reflux.createStore({
  init: function() {
    this.state = _.cloneDeep(NewNoteStateTemplate);
    this.listenToMany(NewNoteActions);
  },
  getState: function() {
    return this.state;
  },
  onSetTitle: function(title) {
    this.state.title = title;
    this.trigger(this.state);
  },
  onSetDescription: function(description) {
    this.state.description = description;
    this.trigger(this.state);
  },
  onUpdateAttachments: function(files) {
    this.state.note.attachments = files;
    this.trigger(this.state);
  },
  onSubmitNoteCompleted: function() {

  },
  onSubmitNoteFailed: function() {

  }
});

module.exports = NewNoteStore;