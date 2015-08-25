var ErrorHandlerMixin = {
  _clearInputError: function(errorField) {
    this.state.errors[errorField] = null;
    this.trigger(this.state);
  },
  _triggerInputError: function(errorField, message) {
    this.state.errors[errorField] = message;
    this.trigger(this.state); 
  }
};

module.exports = ErrorHandlerMixin;