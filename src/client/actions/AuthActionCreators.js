import AuthActionTypes from '.././action_types/AuthActionTypes';

const AuthActionCreators = {

  createUser(data) {
    return {type: AuthActionTypes.CREATE_USER, data}
  },

  login(data) {

  },

  logout(data) {

  }

}

export default AuthActionCreators;