var Reflux = require('reflux');
var ApiCaller = require('.././utils/ApiCaller');
var apiEndpoints = require('.././apiEndpoints');

var AuthActions = Reflux.createActions({
  'createUser': { children: ['completed', 'failed'] },
  'loginUser': { children: ['completed', 'failed'] }
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