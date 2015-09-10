import _ from 'lodash';

let _router;

let RouterContainer = {
  // accepts the router as a argument and sets the internal _router as the router instance passed in
  set: router => _router = router,
  // return the instance of router set on the RouterContainer
  get: () => _router,
  // getRouteObjectFromPath: (routePath) => {
  //   let routeObjects = _.values(_router.namedRoutes);
  //   return _.find(routeObjects, (route) => {
  //     return route.path === routePath;
  //   });
  // }
};

export default RouterContainer;