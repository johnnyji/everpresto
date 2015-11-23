import ApiCaller from '.././utils/ApiCaller';
import AuthActionTypes from '.././action_types/AuthActionTypes';
import apiEndpoints from '.././apiEndpoints';

const AuthActionsCreator = {

  createUser(data) {
    debugger
    return (dispatch) => {
      ApiCaller.sendAjaxRequest({
        method: apiEndpoints.users.create.method,
        url: apiEndpoints.users.create.path,
        data
      })
        .then((response) => dispatch(this.createUserSuccess))
        .catch((err) => {
          // If the user creation failed, we want to alert the failure
          dispatch(AppActionTypes.createFlashMessage('red', err.message));
        });
    };
    return {type: AuthActionTypes.CREATE_USER, data}
  },

  createUserSuccess(user) {

  },

  login(data) {

  },

  logout(data) {

  }

}

export default AuthActionsCreator;