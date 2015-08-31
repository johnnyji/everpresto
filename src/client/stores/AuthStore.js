var Reflux = require('reflux');
var _ = require('lodash');
var AuthActions = require('.././actions/AuthActions');
var AppActions = require('.././actions/AppActions');

var AuthStateTemplate = {
  user: {
    email: null,
    password: null,
    passswordConfirmation: null,
  },
  loginError: null,
  registrationError: null,
  errors: {
    email: null,
    password: null,
    passswordConfirmation: null,
  }
};

var AuthStore = Reflux.createStore({
  init: function() {
    this.state = _.cloneDeep(AuthStateTemplate);
    this.listenToMany(AuthActions);
  },
  getState: function() {
    return this.state;
  },
  onCreateUserCompleted: function(response) {
    AppActions.setCurrentUser(response.data.user);
    AppActions.setApiToken(response.data.token);
    this._resetState();
  },
  onCreateUserFailed: function() {
    //... implement code to display unable to create error
  },
  _resetState: function() {
    this.state = _.cloneDeep(AuthStateTemplate);
    this.trigger(this.state);
  }
});

module.exports = AuthStore;