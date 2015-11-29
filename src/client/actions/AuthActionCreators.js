import ApiCaller from '.././utils/ApiCaller';
import apiEndpoints from '.././apiEndpoints';
import AppActionCreators from '.././actions/AppActionCreators';
import AuthActionTypes from '.././action_types/AuthActionTypes';

const AuthActionCreators = {

  createUser(data) {
    return (dispatch) => {
      ApiCaller.sendAjaxRequest({
        method: apiEndpoints.users.create.method,
        url: apiEndpoints.users.create.path,
        data
      })
        .then(response => {
          dispatch(this.createUserSuccess(response.data));
        })
        .catch(err => {
          dispatch(AppActionCreators.createFlashMessage('red', err.message));
        });
    };
  },

  createUserSuccess(data) {
    return {
      type: AuthActionTypes.CREATE_USER_SUCCESS,
      data
    };
  },

  login(data) {

  },

  logout(data) {

  }

}

export default AuthActionCreators;