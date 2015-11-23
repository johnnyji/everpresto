import Immutable from 'immutable';

import AuthActionTypes from '.././action_types/AuthActionTypes';

const initialState = Immutable.Map({
  user: null
});


export default function authReducer(state = initialState, action) {
  // Always return a new state, never already the one passed in
  let newState = state;

  switch (action.type) {

    // Sets the current user of the state to the user returned by the API
    case AuthActionTypes.CREATE_USER_SUCCESS:
      newState = state.set('user', action.data.user);

    default: return newState;
  }

  return newState;
}