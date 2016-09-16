// Uses babel polyfill
import 'babel-polyfill';
// Imports styles
import './scss/style.scss';

import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {fromJS} from 'immutable';
import routes from './routes';
import configureStore from './store/configureStore';

// Needed until React 1.0.0, allows tap events to work for `material-ui`
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const initialStoreState = window.__INITIAL_STORE_STATE__ || {};

// Transforms into Immutable.js
Object.keys(initialStoreState).forEach((key) => {
  initialStoreState[key] = fromJS(initialStoreState[key]);
});

const store = configureStore(initialStoreState);

// Renders the router client side
render((
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>
), document.getElementById('app'));
