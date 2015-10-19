import './scss/style.scss'; //imports the styles
import React from 'react';
import {render} from 'react-dom';
import Router from 'react-router';

import RouterContainer from './utils/RouterContainer';
import routes from './routes';

// sets the router instance in the RouterContainer, so the routes can be accessed by util classes and Reflux
RouterContainer.set(routes);

// Renders the routes to the DOM
render(routes, document.getElementById('app'));