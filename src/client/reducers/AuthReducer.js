import Immutable from 'immutable';
import AuthActionTypes from '.././action_types/AuthActionTypes';

const {
  CREATE_COMPANY_WITH_USER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS} = AuthActionTypes;

const initialState = Immutable.fromJS({
  company: null,
  user: null
});

export default function authReducer(state = initialState, action) {
  // Always return a new state, never already the one passed in

  switch (action.type) {
    // When a company is successfully created with it's first user
    case CREATE_COMPANY_WITH_USER_SUCCESS:
      return state.merge({
        company: action.data.company,
        user: action.data.user
      });

    case LOGIN_SUCCESS:
      return state.merge({
        company: action.data.company,
        user: action.data.user
      });

    case LOGOUT_SUCCESS:
      return state.merge({
        company: null,
        user: null
      });

    // Default
    default:
      return state;
  }

}