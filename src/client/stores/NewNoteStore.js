var Reflux = require('reflux');
var _ = require('lodash');
var NewNoteActions = require('.././actions/NewNoteActions');
var AppActions = require('.././actions/AppActions');

var NewNoteStateTemplate = {
  note: {
    title: null,
    description: null,
    attachments: [],
    isPrivate: false,
    group: null,
    userId: null,
  },
  errors: {},
  submitting: false
};

var NewNoteStore = Reflux.createStore({
  init: function() {
    this.state = _.cloneDeep(NewNoteStateTemplate);
    this.listenToMany(NewNoteActions);
  },
  getState: function() {
    return this.state;
  },
  onSetUserId: function(id) {
    this.state.note.userId = id;
    this.trigger(this.state);
  },
  onSetTitle: function(title) {
    this.state.note.title = title;
    this.trigger(this.state);
  },
  onSetDescription: function(description) {
    this.state.note.description = description;
    this.trigger(this.state);
  },
  onUpdateAttachments: function(files) {
    this.state.note.attachments = files;
    this.trigger(this.state);
  },
  onSubmitNote: function() {
    this.state.submitting = true;
    this.trigger(this.state);
  },
  onSubmitNoteCompleted: function(result) {
    // delay for half second to show loading bar effect
    setTimeout(function() {
      AppActions.toggleModal();
      this.state = _.cloneDeep(NewNoteStateTemplate);
      this.trigger(this.state);
    }.bind(this), 800);
  },
  onSubmitNoteFailed: function(result) {
    debugger;
  }
});

module.exports = NewNoteStore;