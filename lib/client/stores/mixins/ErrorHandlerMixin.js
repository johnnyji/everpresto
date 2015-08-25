"use strict";

var ErrorHandlerMixin = {
  _clearInputError: function _clearInputError(errorField) {
    this.state.errors[errorField] = null;
    this.trigger(this.state);
  },
  _triggerInputError: function _triggerInputError(errorField, message) {
    this.state.errors[errorField] = message;
    this.trigger(this.state);
  }
};

module.exports = ErrorHandlerMixin;