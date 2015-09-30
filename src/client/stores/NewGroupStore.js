var Reflux = require('reflux');
var NewGroupActions = require('.././actions/NewGroupActions');

var NewGroupStateTemplate = {
  group: {
    creator: null,
    name: null,
    members: []
  },
  errors: {
    name: null
  },
  activeFormPhaseIndex: 0
};

var NewGroupStore = Reflux.createStore({
  init: function() {
    this.state = _.cloneDeep(NewGroupStateTemplate);
    this.listenToMany(NewGroupActions);
  },
  getState: function() {
    return this.state;
  },
  onIncrementActiveFormPhaseIndex: function() {
    this.state.activeFormPhaseIndex += 1;
    this.trigger(this.state);
  },
  onSetGroupCreator: function(user) {
    this.state.group.creator = user;
    this.trigger(this.state);
  },
  onHandleNameChange: function() {

  }
});

module.exports = NewGroupStore;