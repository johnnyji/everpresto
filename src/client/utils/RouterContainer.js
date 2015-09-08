let _router;

let RouterContainer = {
  // accepts the router as a argument and sets the internal _router as the router instance passed in
  set: router => _router = router,
  // return the instance of router set on the RouterContainer
  get: () => _router
};

export default RouterContainer;