//imports the styles
import './scss/style.scss';

import React from 'react';
import {render} from 'react-dom';
import Router from 'react-router';
import {Provider} from 'react-redux';
import {fromJS} from 'immutable';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import routes from './routes/routes';

import configureStore from './store/configureStore';

const initialStoreState = window.__INITIAL_STORE_STATE__;

// Transforms into Immutable.js
Object.keys(initialStoreState).forEach(key => {
  initialStoreState[key] = fromJS(initialStoreState[key]);
});


const store = configureStore(initialStoreState);

// Renders the router client side
render((
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      {routes}
    </Router>
  </Provider>
), document.getElementById('app'));