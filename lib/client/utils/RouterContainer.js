'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

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

// getRouteObjectFromPath: (routePath) => {
//   let routeObjects = _.values(_router.namedRoutes);
//   return _.find(routeObjects, (route) => {
//     return route.path === routePath;
//   });
// }
exports['default'] = RouterContainer;
module.exports = exports['default'];