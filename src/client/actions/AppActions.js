var Reflux = require('reflux');
var ApiCaller = require('.././utils/ApiCaller');
var apiEndpoints = require('.././apiEndpoints');

var AppActions = Reflux.createActions({
  'toggleModal': {},
  'fetchCurrentUser': { children: ['completed', 'failed'] },
  'setCurrentUser': {},
  'setApiToken': {}
});

AppActions.fetchCurrentUser.listen(function(token) {
  ApiCaller.sendAjaxRequest({
    url: apiEndpoints.currentUser.show.path,
    method: apiEndpoints.currentUser.show.method,
    data: { token: token }
  })
  .then(this.completed)
  .catch(this.failed);
});

module.exports = AppActions;