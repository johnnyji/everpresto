'use strict';

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
  mixins: [ErrorHandlerMixin],
  init: function init() {
    this.state = _.cloneDeep(AuthStateTemplate);
    this.listenToMany(AuthActions);
  },
  getState: function getState() {
    return this.state;
  },
  getCurrentUser: function getCurrentUser() {
    return this.state.currentUser;
  },
  getJwt: function getJwt() {
    return this.state.jwt;
  },
  onLogoutUserCompleted: function onLogoutUserCompleted() {
    localStorage.removeItem('jwt');
    this.state.jwt = null;
    this.state.currentUser = null;
    this.trigger(this.state);
    RouterContainer.get().transitionTo('/');
  },
  onCreateUserCompleted: function onCreateUserCompleted(response) {
    this._saveSessionAndRedirect(response);
  },
  onAutoLoginUserCompleted: function onAutoLoginUserCompleted(response, redirectPath) {
    this._saveSessionAndRedirect(response, redirectPath);
  },
  onLoginUserCompleted: function onLoginUserCompleted(response) {
    this._saveSessionAndRedirect(response);
  },
  onLoginUserFailed: function onLoginUserFailed(response) {
    this.state.loginError = response.data.message;
    this.trigger(this.state);
  },
  onHandleEmailChange: function onHandleEmailChange(input) {
    var result = InputValidator.validateEmail(null, input);
    this._handleUserFieldChange('email', input, result);
  },
  onHandlePasswordChange: function onHandlePasswordChange(input) {
    var result = InputValidator.validateLength(null, 6, input);
    this._handleUserFieldChange('password', input, result);
  },
  onHandlePasswordConfirmationChange: function onHandlePasswordConfirmationChange(input) {
    var result = InputValidator.validatePasswordConfirmation(null, this.state.user.password, input);
    this._handleUserFieldChange('passwordConfirmation', input, result);
  },
  _handleUserFieldChange: function _handleUserFieldChange(field, value, validationResult) {
    if (validationResult.valid) {
      this._clearInputError(field);
      this.state.user[field] = value;
    } else {
      this._addInputError(field, validationResult.message);
    }
    this.trigger(this.state);
  },
  _saveSessionAndRedirect: function _saveSessionAndRedirect(response, redirectPath) {
    redirectPath = redirectPath || '/dashboard';
    if (response.data.jwt) {
      localStorage.setItem('jwt', response.data.jwt);
      this.state.jwt = response.data.jwt;
    }
    this.state.currentUser = response.data.user;
    this.trigger(this.state);
    RouterContainer.get().transitionTo(redirectPath);
  }
});

module.exports = AuthStore;