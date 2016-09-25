import http, {endpoints} from '../utils/http';
import AuthActionTypes from '.././action_types/AuthActionTypes';
import {createFlashMessage} from '.././actions/AppActionCreators';

export default {

  /**
   * Sends an API call to create the company with it's initial user
   *
   * @param  {Object} data - Contains the user and company data
   * @return {Function}    - The thunk that performs the API call
   */
  createCompanyWithUser(data) {
    debugger;
    return (dispatch) => {
      http.post(endpoints.users.createWithCompany.path, data)
        .then(({company, user}) => {
          dispatch({
            type: AuthActionTypes.CREATE_COMPANY_WITH_USER_SUCCESS,
            data: {company, user}
          });
        })
        .catch(({message}) => {
          dispatch(createFlashMessage('red', message));
        });
    };
  },

  login(user) {
    return (dispatch) => {
      http.post(endpoints.users.login.path, {user})
        .then((response) => {
          dispatch({
            type: AuthActionTypes.LOGIN_SUCCESS,
            data: response
          });
        })
        .catch(() => {
          dispatch(createFlashMessage('red', 'Oops! Invalid Email/Password'));
        });
    };
  },

  logout() {
    return (dispatch) => {
      http.get(endpoints.users.logout.path)
        .then(() => {
          dispatch({type: AuthActionTypes.LOGOUT_SUCCESS});
        })
        .catch(() => {
          dispatch(createFlashMessage('red', 'Oops! Unable to logout at this time.'));
        });
    };
  }

};
