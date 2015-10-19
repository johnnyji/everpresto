"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var BaseValidator = function BaseValidator() {

  return {
    testCondition: function testCondition(condition, defaultErr, customErr) {
      if (condition) return { valid: true };

      return {
        valid: false,
        message: defaultErr || customErr
      };
    }
  };
};

exports["default"] = BaseValidator;
module.exports = exports["default"];