var Reflux = require('reflux');
var _ = require('lodash');
var AuthActions = require('.././actions/AuthActions');
var AppActions = require('.././actions/AppActions');
var ErrorHandlerMixin = require('./mixins/ErrorHandlerMixin');
var InputValidator = require('.././utils/InputValidator');

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
  mixins: [ErrorHandlerMixin],
  init: function() {
    this.state = _.cloneDeep(AuthStateTemplate);
    this.listenToMany(AuthActions);
  },
  getState: function() {
    return this.state;
  },
  isLoggedIn: function() {
    return _.isObject(this.state.currentUser);
  },
  onHandleEmailChange: function(input) {
    var result = InputValidator.validateEmail(null, input);
    this._handleUserFieldChange('email', input, result);
  },
  onHandlePasswordChange: function(input) {
    var result = InputValidator.validateLength(null, 6, input);
    this._handleUserFieldChange('password', input, result);
  },
  onHandlePasswordConfirmationChange: function(input) {
    var result = InputValidator.validatePasswordConfirmation(null, this.state.user.password, input);
    this._handleUserFieldChange('passwordConfirmation', input, result);
  },
  onCreateUserCompleted: function(response) {
    AppActions.setCurrentUser(response.data.user);
    AppActions.setApiToken(response.data.token);
    this._resetState();
  },
  onCreateUserFailed: function() {
    //... implement code to display unable to create error
  },
  _handleUserFieldChange: function(field, value, validationResult) {
    if (validationResult.valid) {
      this._clearInputError(field);
      this.state.user[field] = value;
    } else {
      this._addInputError(field, validationResult.message);
    }
    this.trigger(this.state);
  },
  _resetState: function() {
    this.state = _.cloneDeep(AuthStateTemplate);
    this.trigger(this.state);
  }
});

module.exports = AuthStore;