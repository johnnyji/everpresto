'use strict';

var Reflux = require('reflux');
var _ = require('lodash');
var AppActions = require('.././actions/AppActions');

var AppStateTemplate = {
  currentUser: null,
  modal: {
    newTimesheet: false
  },
  workTypes: ['Grip Boy', '3rd Assistant Director', 'Assistant Director', 'Boom Mic Operator', 'Driver', 'Producer'],
  appHandlerReady: false
};

var AppStore = Reflux.createStore({
  init: function init() {
    this.state = _.cloneDeep(AppStateTemplate);
    this.listenToMany(AppActions);
  },
  getState: function getState() {
    return this.state;
  },
  getCurrentUser: function getCurrentUser() {
    return this.state.currentUser;
  },
  onToggleModal: function onToggleModal(modalName) {
    // first sets all modals to false, and then sets true to inputted modal name is there is one
    this.state.modal = _.mapValues(this.state.modal, function (v) {
      return v = false;
    });
    if (modalName) {
      this.state.modal[modalName] = true;
    }
    this.trigger(this.state);
  },
  onSetCurrentUserCompleted: function onSetCurrentUserCompleted(result) {
    this.state.currentUser = result.data.user;
    this.state.componentReady = true;
    this.trigger(this.state);
  },
  onSetCurrentUserFailed: function onSetCurrentUserFailed(result) {
    this.state.componentReady = true;
    this.trigger(this.state);
  }
});

module.exports = AppStore;