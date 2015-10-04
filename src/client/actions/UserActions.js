var Reflux = require('reflux');
var ApiCaller = require('.././utils/ApiCaller');
var apiEndpoints = require('.././apiEndpoints');

var UserHelper = require('.././utils/UserHelper');

var UserActions = Reflux.createActions({
  'setCurrentUser': {},
  'loadInitialData': {}
});

module.exports = UserActions;