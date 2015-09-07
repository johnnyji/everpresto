'use strict';

var Reflux = require('reflux');
var ApiCaller = require('.././utils/ApiCaller');
var apiEndpoints = require('.././apiEndpoints');

var AuthActions = Reflux.createActions({
  'handleEmailChange': {},
  'handlePasswordChange': {},
  'handlePasswordConfirmationChange': {},
  'createUser': { children: ['completed', 'failed'] },
  'loginUser': { children: ['completed', 'failed'] }
});

AuthActions.loginUser.listen(function (jwt) {
  if (localStorage.getItem('jwt') !== jwt) {
    var nextPath = RouterContainer.get().getCurrentQuery().nextPath() || '/';
    RouterContainer.get().transitionTo(nextPath);
    localStorage.setItem('jwt', jwt);
  } else {
    ApiCaller.sendAjaxRequest({
      url: apiEndpoints.users.login.path,
      method: apiEndpoints.users.login.method,
      data: { jwt: jwt }
    }).then(this.completed)['catch'](this.failed);
  }
});

AuthActions.createUser.listen(function (data) {
  ApiCaller.sendAjaxRequest({
    url: apiEndpoints.users.create.path,
    method: apiEndpoints.users.create.method,
    data: data
  }).then((function (response) {
    localStorage.setItem('jwt', response.data.token);
    this.completed(response);
  }).bind(this))['catch'](this.failed);
});

module.exports = AuthActions;