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
  'logoutUser': { children: ['completed', 'failed'] }
});

AuthActions.loginUser.listen(function(data) {
  ApiCaller.sendAjaxRequest({
    url: apiEndpoints.users.login.path,
    method: apiEndpoints.users.login.method,
    data: data
  })
  .then(this.completed)
  .catch(this.failed);
});

AuthActions.logoutUser.listen(function() {
  ApiCaller.sendAjaxRequest({
    url: apiEndpoints.users.logout.path,
    method: apiEndpoints.users.logout.method
  })
  .then(this.completed)
  .catch(this.failed);
});

AuthActions.autoLoginUser.listen(function(jwt, redirectPath, routerHistory) {
  ApiCaller.sendAjaxRequest({
    url: apiEndpoints.users.authenticateFromToken.path,
    method: apiEndpoints.users.authenticateFromToken.method,
    data: {jwt: jwt}
  })
  .then(this.completed)
  .catch(() => RouterContainer.get().props.history.pushState(null, '/login'));
  // If the authentication fails, we will redirect the user to the login page for manual auth
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