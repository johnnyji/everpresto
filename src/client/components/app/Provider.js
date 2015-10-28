import {Children, Component, PropTypes} from 'react';
import AuthHelper from '../.././utils/AuthHelper';

export default class Provider extends Component {

  // Initiate a context type so that any child component of `Provider` has access to
  // `this.context.currentUser`
  static childContextTypes = {
    currentUser: PropTypes.object
  };

  static propTypes = {
    currentUser: PropTypes.object
  };

  constructor (props) {
    super(props);
  }

  // This method is required, creates the actual context the child components will access
  getChildrenContext () {
    const providerIsServer = !(typeof window != 'undefined' && window.document);
    
    return {
      currentUser: providerIsServer ? this.props.currentUser : this._getCurrentUserWithClient();
    };
  }

  render () {
    // Returns the only child of the `Provider` which is the `Router` component that will
    // mount our app
    return Children.only(this.props.children)
  }

  // We've detected that the current provider is the browser, so we
  // get the current user using `localStorage` and `jwt`
  _getCurrentUserWithClient = () => {
    const jwt = localStorage.getItem('jwt');

    // If there's no `jwt`, that means there's no saved user session
    if (!Boolean(jwt)) return null;

    return AuthHelper.authenticateFromToken(jwt)
      .then(response => response.data.user)
      .catch(response => null);
  }

}