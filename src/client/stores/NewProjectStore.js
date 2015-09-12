var Reflux = require('reflux');
var _ = require('lodash');
var NewProjectActions = require('.././actions/NewProjectActions');

var ErrorHandlerMixin = require('./mixins/ErrorHandlerMixin');
var InputValidator = require('.././validators/InputValidator');

var NewProjectStateTemplate = {
  project: {
    title: null
  },
  errors: {

  }
};

var NewProjectStore = Reflux.createStore({
  init: function() {
    this.state = _.cloneDeep(NewProjectStateTemplate);
    this.listenToMany(NewProjectActions);
  },
  getState: function() {
    return this.state;
  },
  onSetTitle: function(title) {
    this.state.project.title = title;
    this.trigger(this.state);
  }
});

module.exports = NewProjectStore;