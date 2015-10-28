import ApiCaller from './ApiCaller';
import AuthActions from '.././actions/AuthActions';
import AuthStore from '.././stores/AuthStore';

import apiEndpoints from '.././apiEndpoints';

// Our app is currently being registered by the client,
// therefore we need to authenticate the user using localStorage
const authenticateWithClient = (nextState, replaceState) => {
  const jwt = localStorage.getItem('jwt');

  // if the `jwt` doesn't exist, it means there's no current user session, and we redirect to login screen.
  if (!Boolean(jwt)) return replaceState({nextPathname: nextState.location.pathname}, '/login');

  AuthHelper.authenticateFromToken(jwt)
    .then()
    .catch();
}

// Our app is currently being registered by the server,
// therefore we need to authenticate the user using sessions
const authenticateWithServer = (nextState, replaceState) => {

}

const AuthHelper = {

  // Passed to every protected route component's onEnter to check if the current user 
  // is authenticated. Replaces the route with /login if the user is unauthenticated.
  authenticateUser: (nextState, replaceState) => {
    const isClient = typeof window != 'undefined' && window.document;
  
    if (isClient) {
      authenticateWithClient(nextState, replaceState);
    } else {
      authenticateWithServer(nextState, replaceState);
    }
  },

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