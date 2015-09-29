'use strict';

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
    userId: null
  },
  errors: {},
  submitting: false
};

var NewNoteStore = Reflux.createStore({
  init: function init() {
    this.state = _.cloneDeep(NewNoteStateTemplate);
    this.listenToMany(NewNoteActions);
  },
  getState: function getState() {
    return this.state;
  },
  onSetUserId: function onSetUserId(id) {
    this.state.note.userId = id;
    this.trigger(this.state);
  },
  onSetTitle: function onSetTitle(title) {
    this.state.note.title = title;
    this.trigger(this.state);
  },
  onSetDescription: function onSetDescription(description) {
    this.state.note.description = description;
    this.trigger(this.state);
  },
  onUpdateAttachments: function onUpdateAttachments(files) {
    this.state.note.attachments = files;
    this.trigger(this.state);
  },
  onSubmitNote: function onSubmitNote() {
    this.state.submitting = true;
    this.trigger(this.state);
  },
  onSubmitNoteCompleted: function onSubmitNoteCompleted(result) {
    // delay for half second to show loading bar effect
    setTimeout((function () {
      AppActions.toggleModal();
      this.state = _.cloneDeep(NewNoteStateTemplate);
      this.trigger(this.state);
    }).bind(this), 800);
  },
  onSubmitNoteFailed: function onSubmitNoteFailed(result) {
    debugger;
  }
});

module.exports = NewNoteStore;