import createBrowserHistory from 'history/lib/createBrowserHistory';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '.././reducers/index';

const productionMiddleware = [thunk];

let finalCreateStore;

// If we're in production, we want to leave out development middleware/tools
if (process.env.NODE_ENV === 'production') {
  finalCreateStore = applyMiddleware(...productionMiddleware)(createStore);
} else {
  finalCreateStore = compose(
    applyMiddleware(...productionMiddleware),
    applyMiddleware(createLogger())
  )(createStore);
}

// Exports the function that creates a store
export default function configureStore(initialState) {
  const store = finalCreateStore(reducers, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('.././reducers/index', () => {
      const nextRootReducer = require('.././reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}