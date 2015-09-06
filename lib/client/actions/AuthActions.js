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

AuthActions.loginUser.shouldEmit = function (jwt) {
  // emits the jwt to the store only if the localStorage jwt matches the one passed into the action
  var savedJwt = localStorage.getItem('jwt');
  if (savedJwt !== jwt) {
    var nextPath = RouterContainer.get().getCurrentQuery().nextPath() || '/';
    RouterContainer.get().transitionTo(nextPath);
    localStorage.setItem('jwt', jwt);
  } else {
    return jwt;
  }
};

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