import ApiCaller from './ApiCaller';
import AuthActions from '.././actions/AuthActions';
import AuthStore from '.././stores/AuthStore';
import AppStore from '.././stores/AppStore';
import AppActions from '.././actions/AppActions';

import apiEndpoints from '.././apiEndpoints';

const isClient = typeof window !== 'undefined' && Boolean(window.document);
const isDebugger = document.body.getElementsByTagName('footer').length === 1;


class AuthHelper {

  /**
   * Fetches the current user from the given client token (JWT)
   * 
   * @param {string} token - the encrypted client token containing the current user
   * @return {object} - an unresovled promise object
   */
  authenticateFromToken (token) {
    return ApiCaller.sendAjaxRequest({
      url: apiEndpoints.users.authenticateFromToken.path,
      method: apiEndpoints.users.authenticateFromToken.method,
      data: {jwt: token}
    })
  }

  /**
   * Fetches the current user from the server sessions
   * 
   * @return {object} - an unresovled promise object
   */
  authenticateFromSession () {
    debugger
    return ApiCaller.sendAjaxRequest({
      url: apiEndpoints.users.authenticateFromSession.path,
      method: apiEndpoints.users.authenticateFromSession.method
    });
  }

  /**
   * Attempts to fetch a current user from client token (JWT)
   *
   * @param {string} token - the encrypted client token containing the current user
   * @return {object} - returns the resolved/rejected promise from fetching the user
   */  
  fetchCurrentUserFromClientToken (token, callback) {
    return this.authenticateFromToken(token)
      .then(response => response.data.user)
      .catch(err => null);
  }

  /**
   * Attempts to fetch a current user from server side sessions
   * 
   * @return {object} - returns the resolved/rejected promise from fetching the user
   */
  fetchCurrentUserFromServerSession (callback) {
    return this.authenticateFromSession()
      .then(response => response.data.user)
      .catch(err => null);
  }

  /**
   * Tries to find the any current user instance by all means, checking the store first, then
   * localStorage, then finally the server session
   * 
   * @param  {function} success - accepts a success callback when the user is found
   * @param  {function} fail - accepts a fail callback for when the user isn't found
   * @return {function} - returns either the success callback with the user or the fail with null
   */
  findCurrentUser (success, fail) {
    // No need to find the current user is it's the server rendering, that'll be done
    // before the actual render
    if (isClient && !isDebugger) {
      return new Promise((resolve, reject) => {
        const appStoreUser = AppStore.getCurrentUser();
        if (appStoreUser) resolve(appStoreUser);

        const jwt = localStorage.getItem('jwt');

        if (jwt) {
          this.authenticateFromToken(jwt)
            .then(response => {
              // Sets the found user, so next time we can short circuit at the first `if` statement
              AppActions.setCurrentUser(response.data.user);
              return resolve(response.data.user);
            })
            .catch(response => reject(response));
        } else {
          reject('No current user stored anywhere');
        }

      });
    }

  }

}

export default new AuthHelper;