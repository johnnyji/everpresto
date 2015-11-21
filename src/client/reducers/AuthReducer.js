import Immutable from 'immutable';

import AuthActionTypes from '.././action_types/AuthActionTypes';

const initialState = Immutable.Map({
  currentUser: null
});


export default function authReducer(state = initialState, action) {

  switch (action.type) {

    // Sets the current user of the state to the user returned by the API
    case AuthActionTypes.CREATE_USER:
      return state.set('currentUser', action.data.currentUser);

    // Return the state if no action is met
    default:
      return state;
  }

}