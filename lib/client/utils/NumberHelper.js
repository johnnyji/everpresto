"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NumberHelper = (function () {
  function NumberHelper() {
    _classCallCheck(this, NumberHelper);
  }

  _createClass(NumberHelper, null, [{
    key: "addSuffix",
    value: function addSuffix(number) {
      var j = number % 10;
      var k = number % 100;

      if (j == 1 && k != 11) return number + "st";
      if (j == 2 && k != 12) return number + "nd";
      if (j == 3 && k != 13) return number + "rd";
      return number + "th";
    }
  }]);

  return NumberHelper;
})();

exports["default"] = NumberHelper;
module.exports = exports["default"];