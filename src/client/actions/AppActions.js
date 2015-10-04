var Reflux = require('reflux');
var ApiCaller = require('.././utils/ApiCaller');
var apiEndpoints = require('.././apiEndpoints');

var AppActions = Reflux.createActions({
  'toggleModal': {},
  'loadInitialDashboardData': {},
  'triggerFlashMessage': {},
  'triggerFlashError': {}
});

AppActions.loadInitialDashboardData.listen(function() {
  // Promise.all([
    debugger;
    ApiCaller.sendAjaxRequest({
      url: apiEndpoints.groups.show.path,
      method: apiEndpoints.groups.show.method
    })
  // ])
  .then(function(result) {
    debugger
    // var activeGroup = result[0];
  })
  .catch(function() {
    debugger
  });
});

module.exports = AppActions;