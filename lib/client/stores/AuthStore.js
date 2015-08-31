'use strict';

var Reflux = require('reflux');
var AuthActions = require('.././actions/AuthActions');

var AuthStore = Reflux.createStore({
  init: function init() {
    this.listenToMany(AuthActions);
  },
  onCreateUserCompleted: function onCreateUserCompleted(response) {
    debugger;
  }
});

module.exports = AuthStore;