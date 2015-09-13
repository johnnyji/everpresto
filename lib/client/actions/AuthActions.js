'use strict';

var Reflux = require('reflux');
var ApiCaller = require('.././utils/ApiCaller');
var apiEndpoints = require('.././apiEndpoints');
var RouterContainer = require('.././utils/RouterContainer');

var AuthActions = Reflux.createActions({
  'handleEmailChange': {},
  'handlePasswordChange': {},
  'handlePasswordConfirmationChange': {},
  'createUser': { children: ['completed', 'failed'] },
  'autoLoginUser': { children: ['completed', 'failed'] },
  'loginUser': { children: ['completed', 'failed'] },
  'logoutUser': {}
});

AuthActions.loginUser.listen(function (data) {
  ApiCaller.sendAjaxRequest({
    url: apiEndpoints.users.login.path,
    method: apiEndpoints.users.login.method,
    data: data
  }).then(this.completed)['catch'](this.failed);
});

AuthActions.autoLoginUser.listen(function (jwt, redirectPath) {
  if (localStorage.getItem('jwt') !== jwt) {
    RouterContainer.get().transitionTo('/login');
  } else {
    ApiCaller.sendAjaxRequest({
      url: apiEndpoints.users.authenticateWithToken.path,
      method: apiEndpoints.users.authenticateWithToken.method,
      data: { jwt: jwt }
    }).then((function (response) {
      this.completed(response, redirectPath);
    }).bind(this))['catch'](this.failed);
  }
});

AuthActions.createUser.listen(function (data) {
  ApiCaller.sendAjaxRequest({
    url: apiEndpoints.users.create.path,
    method: apiEndpoints.users.create.method,
    data: data
  }).then(this.completed)['catch'](this.failed);
});

module.exports = AuthActions;