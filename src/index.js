import '.././node_modules/react-widgets/dist/css/react-widgets.css'; // import styles for react widgets package
import './scss/style.scss'; //imports the styles
import React from 'react';
import Router from 'react-router';
import routes from './routes';

import AppFooter from './components/app/AppFooter'

Router.run(routes, Router.HistoryLocation, Handler => {
  React.render(<Handler />, document.getElementById('app'));
});

React.render(<AppFooter />, document.getElementById('app-footer'));