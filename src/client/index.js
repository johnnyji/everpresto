import '../.././node_modules/react-widgets/dist/css/react-widgets.css'; // import styles for react widgets package
import './scss/style.scss'; //imports the styles
import React from 'react';
import Router from 'react-router';
import RouterContainer from './utils/RouterContainer';
import routes from './routes';

import AuthActions from './actions/AuthActions';

// creates the router instance
let router = Router.create({
  routes: routes,
  location: Router.HistoryLocation
});

// sets the router instance in the RouterContainer, so the routes can be accessed by util classes and Reflux
RouterContainer.set(router);

// runs the router after the user has been logged in.
router.run(Handler => {
  React.render(<Handler />, document.getElementById('app'));
});