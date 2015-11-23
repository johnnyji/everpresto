import ApiCaller from '.././utils/ApiCaller';
import AuthActionTypes from '.././action_types/AuthActionTypes';
import apiEndpoints from '.././apiEndpoints';

import AppActionsCreator from '.././actions/AppActionsCreator';

const AuthActionsCreator = {

  createUser(data) {
    debugger;
    return (dispatch) => {
      debugger;
      setTimeout(() => {
        dispatch(
          AppActionsCreator.createFlashMessage('yellow', 'Works!')
        );
      }, 1000);
      // ApiCaller.sendAjaxRequest({
      //   method: apiEndpoints.users.create.method,
      //   url: apiEndpoints.users.create.path,
      //   data
      // })
      //   .then((response) => {
      //     debugger
      //     dispatch(this.createUserSuccess(response.data.user))
      //   })
      //   .catch((err) => {
      //     // If the user creation failed, we want to alert the failure
      //     dispatch(AppActionTypes.createFlashMessage('red', err.message));
      //   });
    };
  },

  createUserSuccess(user) {
    return {
      type: AuthActions.CREATE_USER_SUCCESS,
      data: user
    };
  },

  login(data) {

  },

  logout(data) {

  }

}

export default AuthActionsCreator;