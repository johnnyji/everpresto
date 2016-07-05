import endpoints from '../utils/http/endpoints';
import {sendAjaxRequest} from '.././utils/ApiCaller';
import {createFlashMessage} from '.././actions/AppActionCreators';
import AuthActionTypes from '.././action_types/AuthActionTypes';

const AuthActionCreators = {

  /**
   * Sends an API call to create the company with it's initial user
   *
   * @param  {Object} data - Contains the user and company data
   * @return {Function}    - The thunk that performs the API call
   */
  createCompanyWithUser(data) {
    return (dispatch) => {
      sendAjaxRequest({
        method: endpoints.users.createWithCompany.method,
        url: endpoints.users.createWithCompany.path,
        data
      })
        .then((response) => dispatch(this.createCompanyWithUserSuccess(response.data)))
        .catch((response) => dispatch(createFlashMessage('red', response.data.message)));
    };
  },

  /**
   * Handles the success of the creation
   *
   * @param  {Object} options.company - The created company
   * @param  {Object} options.user    - The created user
   * @return {Object}                 - Data sent to the Auth Reducer
   */
  createCompanyWithUserSuccess({company, user}) {
    return {
      type: AuthActionTypes.CREATE_COMPANY_WITH_USER_SUCCESS,
      data: {company, user}
    };
  },

  login(user) {
    return (dispatch) => {
      sendAjaxRequest({
        method: endpoints.users.login.method,
        url: endpoints.users.login.path,
        data: {user}
      })
        .then((response) => dispatch(this.loginSuccess(response.data)))
        .catch(() => dispatch(createFlashMessage('red', 'Oops! Invalid Email/Password')));
    };
  },

  loginSuccess(data) {
    return {
      type: AuthActionTypes.LOGIN_SUCCESS,
      data
    };
  },

  // loginError(message) {
  //   return {
  //     type: AuthActionTypes.LOGIN_ERROR,
  //     data: {message}
  //   }
  // },

  logout() {
    return (dispatch) => {
      sendAjaxRequest({
        method: endpoints.users.logout.method,
        url: endpoints.users.logout.path
      })
        .then(() => dispatch(this.logoutSuccess()))
        .catch(() => dispatch(createFlashMessage('red', 'Oops! Unable to logout at this time.')));
    };
  },

  logoutSuccess() {
    return {type: AuthActionTypes.LOGOUT_SUCCESS};
  }

};

export default AuthActionCreators;
