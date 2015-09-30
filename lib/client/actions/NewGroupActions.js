'use strict';

var Reflux = require('reflux');

var NewGroupActions = Reflux.createActions({
  'setGroupCreator': {},
  'setGroupName': {},
  'resetState': {}
});

module.exports = NewGroupActions;