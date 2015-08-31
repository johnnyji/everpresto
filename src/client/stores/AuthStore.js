var Reflux = require('reflux');
var AuthActions = require('.././actions/AuthActions');

var AuthStore = Reflux.createStore({
  init: function() {
    this.listenToMany(AuthActions);
  },
  onRegisterUser: function() {
    debugger;
  },
  onRegisterUserCompleted: function(user) {
    debugger;
  },
  onRegisterUserFailed: function(err) {
    debugger;
  },
  onLoginUserCompleted: function(user) {
    debugger;
  },
  onLoginUserFailed: function(err) {
    debugger;
  }
});

module.exports = AuthStore;