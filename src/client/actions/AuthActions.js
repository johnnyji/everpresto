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
  'loginUser': {}
});

AuthActions.loginUser.listen(function() {
  ApiCaller.sendAjaxRequest({
    url: apiEndpoints.users.login.path,
    method: apiEndpoints.users.login.method
  })
  .then(this.completed)
  .catch(this.failed);
});

AuthActions.autoLoginUser.listen(function(jwt) {
  if (localStorage.getItem('jwt') !== jwt) {
    RouterContainer.get().transitionTo('/login');
  } else {
    ApiCaller.sendAjaxRequest({
      url: apiEndpoints.users.login.path,
      method: apiEndpoints.users.login.method,
      data: { jwt: jwt }
    })
    .then(this.completed)
    .catch(this.failed);
  }
});

AuthActions.createUser.listen(function(data) {
  ApiCaller.sendAjaxRequest({
    url: apiEndpoints.users.create.path,
    method: apiEndpoints.users.create.method,
    data: data
  })
  .then(this.completed)
  .catch(this.failed);
});

module.exports = AuthActions;