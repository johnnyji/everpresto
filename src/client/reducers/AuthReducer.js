import Immutable from 'immutable';
import AuthActionTypes from '.././action_types/AuthActionTypes';

const initialState = Immutable.Map({
  company: null,
  user: null
});


export default function authReducer(state = initialState, action) {
  // Always return a new state, never already the one passed in
  let newState = state;

  switch (action.type) {

    // When the user is succesfully saved into the API
    case AuthActionTypes.CREATE_USER_SUCCESS:
      // Sets the current user of the state to the user returned by the API
      newState = state.set('user', Immutable.fromJS(action.data.user));

    // Default
    default: return newState;
  }

  return newState;
}