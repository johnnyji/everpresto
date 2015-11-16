//imports the styles
import './scss/style.scss';

import React from 'react';
import {render} from 'react-dom';
import {fromJS} from 'immutable';

// The router being rendered with all it's child routes
import routes from './routes';

import * as reducers from './reducers';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';

// Grabs the initial store state provided by the server
const initialStoreState = window.__INITIAL_STATE__;

// Transforms into Immutable.js
Object.keys(initialStoreState).forEach(key => {
  initialStoreState[key] = fromJS(initialStoreState[key]);
});

debugger

const reducer = combineReducers(reducers);
const store = createStore(reducer, initialStoreState);

// Renders the router client side
render(<Provider store={store}>routes</Provider>, document.getElementById('app'));