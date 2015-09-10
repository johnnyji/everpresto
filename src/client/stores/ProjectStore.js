var Reflux = require('reflux');
var _ = require('lodash');
var ProjectActions = require('.././actions/ProjectActions');

var ProjectStateTemplate = {
  projects: {
    active: null,
    archived: null
  },
  activeTabIndex: 0
};

var ProjectStore = Reflux.createStore({
  init: function() {
    this.state = _.cloneDeep(ProjectStateTemplate);
    this.listenToMany(ProjectActions);
  },
  getState: function() {
    return this.state;
  },
  projectsLoaded: function() {
    return this.state.projectsLoaded;
  },
  onChangeActiveTabIndex: function(index) {
    this.state.activeTabIndex = index;
    this.trigger(this.state);
  },
  onLoadProjectsCompleted: function(response) {
    if (response.data.projects.length === 0) return;

    var filteredProjects = _.partition(response.data.projects, function(project) {
      return project.archived; // will make filteredProjects[0] all archived, and filteredProjects[1] all active
    });
    this.state.projects = {
      archived: filteredProjects[0],
      active: filteredProjects[1]
    };
    this.trigger(this.state);
  }
});

module.exports = ProjectStore;