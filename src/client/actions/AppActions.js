var Reflux = require('reflux');
var ApiCaller = require('.././utils/ApiCaller');
var apiEnpoints = require('.././apiEndpoints');

var AppActions = Reflux.createActions({
  'toggleModal': {},
  'setCurrentUser': { children: ['completed', 'failed'] }
});

AppActions.setCurrentUser.listen(function(jwt) {
  ApiCaller.sendAjaxRequest({
    url: apiEndpoints.currentUserPath,
    method: 'GET',
    data: { jwt: jwt }
  })
  .then(this.completed)
  .catch(this.failed);
});

module.exports = AppActions;