var Reflux = require('reflux');
var NewGroupActions = require('.././actions/NewGroupActions');
var InputValidator = require('.././validators/InputValidator');
var ErrorHandlerMixin = require('./mixins/ErrorHandlerMixin');

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
  mixins: [ErrorHandlerMixin],
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
  onSetGroupName: function(name) {
    let exists = InputValidator.validateStringPresence('Please enter a name for your group.', name);
    let isLongEnough = InputValidator.validateLength('Name is too short! At least 3 chars please.', 3, name);

    if (!exists.valid) {
      this._addInputError('name', exists.message);
    } else if (!isLongEnough.valid) {
      this._addInputError('name', isLongEnough.message);
    } else {
      this._clearInputError('name');
      this.state.group.name = name;
      this.state.activeFormPhaseIndex += 1;
    }
    this.trigger(this.state);
  },
  onResetState: function() {
    this.state = _.cloneDeep(NewGroupStateTemplate);
    this.trigger(this.state);
  }
});

module.exports = NewGroupStore;