import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from '.././reducers/index';


// Transforms state data from Immutable to JS
const transformToJs = (state) => {
  const transformedState = {};

  for (const key in state) {
    if (state.hasOwnProperty(key)) transformedState[key] = state[key].toJS();
  }
  return transformedState;
};


// Here we create the final store,
// If we're in production, we want to leave out development middleware/tools
let finalCreateStore;
if (process.env.NODE_ENV === 'production') {
  finalCreateStore = applyMiddleware(thunkMiddleware)(createStore);
} else {
  finalCreateStore = applyMiddleware(
    thunkMiddleware,
    createLogger({stateTransformer: transformToJs})
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