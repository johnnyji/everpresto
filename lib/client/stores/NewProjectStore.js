'use strict';

var Reflux = require('reflux');
var _ = require('lodash');
var NewProjectActions = require('.././actions/NewProjectActions');

var ErrorHandlerMixin = require('./mixins/ErrorHandlerMixin');
var InputValidator = require('.././validators/InputValidator');

var NewProjectStateTemplate = {
  project: {
    title: null,
    budget: {
      minInCents: null,
      maxInCents: null
    }
  },
  errors: {
    title: null
  }
};

var NewProjectStore = Reflux.createStore({
  init: function init() {
    this.state = _.cloneDeep(NewProjectStateTemplate);
    this.listenToMany(NewProjectActions);
  },
  getState: function getState() {
    return this.state;
  },
  onSetTitle: function onSetTitle(title) {
    this.state.project.title = title;
    this.trigger(this.state);
  },
  onSetDescription: function onSetDescription(description) {
    this.state.project.description = description;
    this.trigger(this.state);
  },
  onSetMinBudget: function onSetMinBudget(value) {
    this.state.project.budget.minInCents = value;
    this.trigger(this.state);
  }
});

module.exports = NewProjectStore;