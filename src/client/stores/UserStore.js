var Reflux = require('reflux');
var UserActions = require('.././actions/UserActions');

var UserStore = Reflux.createStore({
  init: function() {
    this.state = _.cloneDeep(UserStateTemplate);
    this.listenToMany(UserActions);
  },
  onSetCurrentUser: function(user) {
    this.state.currentUser = user;
    this.trigger(this.state);
  }
});

module.exports = UserStore;