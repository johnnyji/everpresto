'use strict';

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
  init: function init() {
    this.state = _.cloneDeep(NewNoteStateTemplate);
    this.listenToMany(NewNoteActions);
  },
  getState: function getState() {
    return this.state;
  },
  onSetTitle: function onSetTitle(title) {
    this.state.title = title;
    this.trigger(this.state);
  },
  onSetDescription: function onSetDescription(description) {
    this.state.description = description;
    this.trigger(this.state);
  },
  onUpdateAttachments: function onUpdateAttachments(files) {
    this.state.note.attachments = files;
    this.trigger(this.state);
  }
});

module.exports = NewNoteStore;