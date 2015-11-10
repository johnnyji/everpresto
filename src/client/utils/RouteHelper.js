import AuthHelper from './AuthHelper';

const isClient = typeof window !== 'undefined' && Boolean(window.document);
const isDebugger = document.body.getElementsByTagName('footer').length === 1;

class RouteHelper {

  /**
   * Checks if the user has an existing session, if so redirects them to their dashboard
   * otherwise, it'll just stay on the landing page
   * 
   * @param  {object} nextState - the next router state object (provided by React Router)
   * @param  {function} replaceState - the function that executes to replace router state (provided by React Router)
   * @param  {function} callback - a callback function to make the onEnter asynchronous
   */
  initialAuthCheck (nextState, replaceState, callback) {
    if (isClient && !isDebugger) {
      AuthHelper.findCurrentUser()
        .then(response => {
          // TODO: The only thing that isn't working is that this replaceState isn't being called
          replaceState({nextPathname: nextState.location.pathname}, '/dashboard');
          // Because we're running an asynchronous call, we must invoke the callback in order
          // to declare our call has completed, only then can router perform it's `replaceState`
          callback();
        })
        .catch(response => {});
    }
  }

  /**
   * Authorizes the current user, if unable to, will redirect the user to the login screen
   * 
   * @param  {object} nextState - the next router state object (provided by React Router)
   * @param  {function} replaceState - the function that executes to replace router state (provided by React Router)
   */
  requireAuth (nextState, replaceState) {
    if (isClient && !isDebugger) {
      AuthHelper.findCurrentUser()
        .then(response => {})
        .catch(response => {
          // Because we're running an asynchronous call, we must invoke the callback in order
          // to declare our call has completed, only then can router perform it's `replaceState`
          replaceState({nextPathname: nextState.location.pathname}, '/login');
        });
    }
  }

}

export default new RouteHelper;