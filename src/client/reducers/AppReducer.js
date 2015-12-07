import Immutable from 'immutable';
import AppActionTypes from './../action_types/AppActionTypes';

const initialState = Immutable.fromJS({
  flash: {
    color: null,
    message: null
  },
  modal: {
    display: false,
    element: null
  }
});

// Do NOT mutate state passed in by doing `state = state.set(...)`, simply return `state.set(...)`

/**
 * The reducer for the `app` state in the store, not to be confused with the state of the entire app.
 *
 * @param  {Object} state - The `app` state section of the store.
 * @param  {Object} action - The return object of the action triggered by the `AppActionsCreator`
 * @return {Object} - The new state
 */
export default function appReducer(state = initialState, action) {
  // Each reducer must return a new state, never modify the original.

  switch (action.type) {

    // Creates a flash message
    case AppActionTypes.CREATE_FLASH_MESSAGE:
      return state.set('flash', Immutable.Map(action.data));

    // Dismiss a flash message
    case AppActionTypes.DISMISS_FLASH_MESSAGE:
      return state.set('flash', Immutable.Map({color: null, message: null}));

    // Creates the modal box
    case AppActionTypes.CREATE_MODAL:
      return state.set('modal', Immutable.Map({display: true, element: action.data.modalElement}));

    // Dismiss the modal box
    case AppActionTypes.DISMISS_MODAL:
      return state.set('modal', Immutable.Map({display: false, element: null}));

    default:
      return state;

  }

}