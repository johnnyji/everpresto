var Reflux = require('reflux');
var ApiCaller = require('.././utils/ApiCaller');
var apiEndpoints = require('.././apiEndpoints');

var AppActions = Reflux.createActions({
  'toggleModal': {},
});

module.exports = AppActions;