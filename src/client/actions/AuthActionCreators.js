import apiEndpoints from '.././apiEndpoints';
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
        method: apiEndpoints.users.createWithCompany.method,
        url: apiEndpoints.users.createWithCompany.path,
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

  login(data) {

  },

  logout(data) {

  }

}

export default AuthActionCreators;