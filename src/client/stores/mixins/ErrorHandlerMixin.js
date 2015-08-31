var ErrorHandlerMixin = {
  _clearInputError: function(errorField) {
    this.state.errors[errorField] = null;
  },
  _addInputError: function(errorField, message) {
    this.state.errors[errorField] = message;
  }
};

module.exports = ErrorHandlerMixin;