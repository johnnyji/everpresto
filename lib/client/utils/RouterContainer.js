"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _router = undefined;

var RouterContainer = {
  // accepts the router as a argument and sets the internal _router as the router instance passed in
  set: function set(router) {
    return _router = router;
  },
  // return the instance of router set on the RouterContainer
  get: function get() {
    return _router;
  }
};

exports["default"] = RouterContainer;
module.exports = exports["default"];