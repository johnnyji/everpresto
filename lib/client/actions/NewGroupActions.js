'use strict';

var Reflux = require('reflux');
var ApiCaller = require('.././utils/ApiCaller');
var apiEndpoints = require('.././apiEndpoints');

var NewGroupActions = Reflux.createActions({
  'setGroupCreator': {},
  'setGroupName': {},
  'addExistingUsers': {},
  'batchInviteNewUsers': {},
  'resetState': {}
});

module.exports = NewGroupActions;