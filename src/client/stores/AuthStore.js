var Reflux = require('reflux');
var AuthActions = require('.././actions/AuthActions');

var AuthStore = Reflux.createStore({
  init: function() {
    this.listenToMany(AuthActions);
  },
  onCreateUserCompleted: function(response) {
    debugger;
  }
});

module.exports = AuthStore;