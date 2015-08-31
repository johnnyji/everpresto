"use strict";

var ErrorHandlerMixin = {
  _clearInputError: function _clearInputError(errorField) {
    this.state.errors[errorField] = null;
  },
  _addInputError: function _addInputError(errorField, message) {
    this.state.errors[errorField] = message;
  }
};

module.exports = ErrorHandlerMixin;