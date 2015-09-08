"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseValidator = (function () {
  function BaseValidator() {
    _classCallCheck(this, BaseValidator);
  }

  _createClass(BaseValidator, [{
    key: "_testCondition",
    value: function _testCondition(condition, defaultError, customError) {
      if (condition) {
        return { valid: true };
      }
      return {
        valid: false,
        message: defaultError || customError
      };
    }
  }]);

  return BaseValidator;
})();

exports["default"] = BaseValidator;
module.exports = exports["default"];