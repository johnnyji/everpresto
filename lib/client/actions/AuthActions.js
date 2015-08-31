'use strict';

var Reflux = require('reflux');
var ApiCaller = require('.././utils/ApiCaller');
var apiEndpoints = require('.././apiEndpoints');

var AuthActions = Reflux.createActions({
  'registerUser': { children: ['completed', 'failed'] },
  'loginUser': { children: ['completed', 'failed'] }
});

AuthActions.registerUser.listen(function (data) {
  ApiCaller.sendAjaxRequest({
    url: apiEndpoints.users.create.path,
    method: apiEndpoints.users.create.method,
    data: data
  }).then(this.completed)['catch'](this.failed);
});

AuthActions.loginUser.listen(function (data) {
  ApiCaller.sendAjaxRequest({
    url: apiEndpoints.users.login.path,
    method: apiEndpoints.users.login.method,
    data: data
  }).then(function () {
    debugger;
  })['catch'](function () {
    debugger;
  });
});

module.exports = AuthActions;