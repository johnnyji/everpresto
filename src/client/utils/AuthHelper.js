import AuthActions from '.././actions/AuthActions';
import AuthStore from '.././stores/AuthStore';

class AuthHelper {
  // checks for current user, if non existent then it auto logins based on jwt in localStorage
  updateCurrentUser() {
    if (AuthStore.getCurrentUser()) return;

    let jwt = localStorage.getItem('jwt');
    if (jwt) AuthActions.autoLoginUser(jwt);
  }
}

export default new AuthHelper;