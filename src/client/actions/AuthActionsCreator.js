import AuthActionTypes from '.././action_types/AuthActionTypes';

const AuthActionsCreator = {

  createUser(data) {
    return {type: AuthActionTypes.CREATE_USER, data}
  },

  login(data) {

  },

  logout(data) {

  }

}

export default AuthActionsCreator;