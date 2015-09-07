'use strict';

var Reflux = require('reflux');
var _ = require('lodash');
var RouterContainer = require('.././utils/RouterContainer');

var AuthActions = require('.././actions/AuthActions');
var AppActions = require('.././actions/AppActions');
var ErrorHandlerMixin = require('./mixins/ErrorHandlerMixin');
var InputValidator = require('.././utils/InputValidator');

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
  onCreateUserCompleted: function onCreateUserCompleted(response) {
    this.state.jwt = response.data.token;
    this.state.currentUser = response.data.user;
    debugger;
    RouterContainer.get().transitionTo('/dashboard');
  },
  onCreateUserFailed: function onCreateUserFailed() {
    //... implement code to display unable to create error
  },
  onLoginUserCompleted: function onLoginUserCompleted(response) {
    this.state.currentUser = response.data.user;
    RouterContainer.get().transitionTo('/dashboard');
  },
  onLoginUserFailed: function onLoginUserFailed() {
    debugger;
  },
  _handleUserFieldChange: function _handleUserFieldChange(field, value, validationResult) {
    if (validationResult.valid) {
      this._clearInputError(field);
      this.state.user[field] = value;
    } else {
      this._addInputError(field, validationResult.message);
    }
    this.trigger(this.state);
  }
});

module.exports = AuthStore;