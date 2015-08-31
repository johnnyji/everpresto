'use strict';

var Reflux = require('reflux');
var AuthActions = require('.././actions/AuthActions');

var AuthStore = Reflux.createStore({
  init: function init() {
    this.listenToMany(AuthActions);
  },
  onRegisterUser: function onRegisterUser() {
    debugger;
  },
  onRegisterUserCompleted: function onRegisterUserCompleted(user) {
    debugger;
  },
  onRegisterUserFailed: function onRegisterUserFailed(err) {
    debugger;
  },
  onLoginUserCompleted: function onLoginUserCompleted(user) {
    debugger;
  },
  onLoginUserFailed: function onLoginUserFailed(err) {
    debugger;
  }
});

module.exports = AuthStore;