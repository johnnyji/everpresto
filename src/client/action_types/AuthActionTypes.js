import createConstants from './utils/createConstants';

const AuthActionTypes = createConstants([
  'CREATE_COMPANY_WITH_USER_SUCCESS',
  'CREATE_COMPANY_WITH_USER_SUCCESS_SUCCESS',
  'LOGIN',
  'LOGIN_SUCCESS',
  'LOGOUT',
  'LOGOUT_SUCCESS'
]);

export default AuthActionTypes;
