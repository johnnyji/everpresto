var Reflux = require('reflux');
var ApiCaller = require('.././utils/ApiCaller');
var apiEnpoints = require('.././apiEndpoints');

var AppActions = Reflux.createActions({
  'toggleModal': {},
  'setCurrentUser': {},
  'setToken': {}
});

module.exports = AppActions;