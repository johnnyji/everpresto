import ApiCaller from '.././utils/ApiCaller';
import apiEndpoints from '.././apiEndpoints';
import {createFlashMessage} from '.././actions/AppActionCreators';
import AuthActionTypes from '.././action_types/AuthActionTypes';

const AuthActionCreators = {

  createUser(data) {
    return (dispatch) => {
      ApiCaller.sendAjaxRequest({
        method: apiEndpoints.users.create.method,
        url: apiEndpoints.users.create.path,
        data
      })
        .then((response) => dispatch(this.createUserSuccess(response.data)))
        .catch((response) => dispatch(createFlashMessage('red', response.data.message)));
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