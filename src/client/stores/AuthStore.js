var Reflux = require('reflux');
var _ = require('lodash');
var RouterContainer = require('.././utils/RouterContainer');

var AuthActions = require('.././actions/AuthActions');
var AppActions = require('.././actions/AppActions');
var ErrorHandlerMixin = require('./mixins/ErrorHandlerMixin');
var InputValidator = require('.././validators/InputValidator');

var AuthStateTemplate = {
  jwt: null,
  currentUser: null,
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
  getCurrentUser: function() {
    return this.state.currentUser;
  },
  getJwt: function() {
    return this.state.jwt;
  },
  onLogoutUser: function() {
    localStorage.removeItem('jwt');
    this.state.jwt = null;
    this.state.currentUser = null;
    this.trigger(this.state);
  },
  onCreateUserCompleted: function(response) {
    this._saveSessionAndRedirect(response);
  },
  onAutoLoginUserCompleted: function(response, redirectPath) {
    this._saveSessionAndRedirect(response, redirectPath);
  },
  onLoginUserCompleted: function(response) {
    this._saveSessionAndRedirect(response);
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
  _handleUserFieldChange: function(field, value, validationResult) {
    if (validationResult.valid) {
      this._clearInputError(field);
      this.state.user[field] = value;
    } else {
      this._addInputError(field, validationResult.message);
    }
    this.trigger(this.state);
  },
  _saveSessionAndRedirect: function(response, redirectPath) {
    redirectPath = redirectPath || '/dashboard';
    if (response.data.token) {
      localStorage.setItem('jwt', response.data.token);
      this.state.jwt = response.data.token;
    }
    this.state.currentUser = response.data.user;
    this.trigger(this.state);
    RouterContainer.get().transitionTo(redirectPath);
  }
});

module.exports = AuthStore;
