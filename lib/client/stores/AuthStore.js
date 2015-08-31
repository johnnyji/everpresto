'use strict';

var Reflux = require('reflux');
var _ = require('lodash');
var AuthActions = require('.././actions/AuthActions');
var AppActions = require('.././actions/AppActions');

var AuthStateTemplate = {
  user: {
    email: null,
    password: null,
    passswordConfirmation: null
  },
  loginError: null,
  registrationError: null,
  errors: {
    email: null,
    password: null,
    passswordConfirmation: null
  }
};

var AuthStore = Reflux.createStore({
  init: function init() {
    this.state = _.cloneDeep(AuthStateTemplate);
    this.listenToMany(AuthActions);
  },
  getState: function getState() {
    return this.state;
  },
  onCreateUserCompleted: function onCreateUserCompleted(response) {
    AppActions.setCurrentUser(response.data.user);
    AppActions.setApiToken(response.data.token);
    this._resetState();
  },
  onCreateUserFailed: function onCreateUserFailed() {
    //... implement code to display unable to create error
  },
  _resetState: function _resetState() {
    this.state = _.cloneDeep(AuthStateTemplate);
    this.trigger(this.state);
  }
});

module.exports = AuthStore;