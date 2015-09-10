'use strict';

var Reflux = require('reflux');
var ApiCaller = require('.././utils/ApiCaller');
var apiEndpoints = require('.././apiEndpoints');

var ProjectActions = Reflux.createActions({
  'changeActiveTabIndex': {},
  'loadProjects': { children: ['completed', 'failed'] }
});

ProjectActions.loadProjects.listen(function () {
  ApiCaller.sendAjaxRequest({
    url: apiEndpoints.projects.collection.path,
    method: apiEndpoints.projects.collection.method
  }).then(this.completed)['catch'](this.failed);
});

module.exports = ProjectActions;