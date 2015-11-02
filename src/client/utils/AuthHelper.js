import ApiCaller from './ApiCaller';
import AuthActions from '.././actions/AuthActions';
import AuthStore from '.././stores/AuthStore';

import apiEndpoints from '.././apiEndpoints';


const AuthHelper = {

  // // Passed to every protected route component's onEnter to check if the current user 
  // // is authenticated. Replaces the route with /login if the user is unauthenticated.
  // getCurrentUser: () => {
  //   // const isClient = typeof window != 'undefined' && window.document;
  //   const isClient = Boolean(localStorage.getItem('client'));
  
  //   if (isClient) {
  //     authenticateWithClient();
  //   } else {
  //     authenticateWithServer();
  //   }
  // },

  // Makes an AJAX call to the server to authenticate the user based on the token
  // passed in. This will return a pending promise that the will be resolved
  // by the original place of invocation.
  authenticateFromToken: token => {
    return ApiCaller.sendAjaxRequest({
      url: apiEndpoints.users.authenticateFromToken.path,
      method: apiEndpoints.users.authenticateFromToken.method,
      data: {jwt: token}
    })
  },

  // checks for current user, if non existent then it auto logins based on jwt in localStorage
  updateCurrentUser: token => {
    if (AuthStore.getCurrentUser()) return;
    AuthActions.autoLoginUser(token || localStorage.getItem('jwt'));
  }

};

export default AuthHelper;