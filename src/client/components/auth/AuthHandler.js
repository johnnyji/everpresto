import React, {Component, PropTypes} from 'react';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

import AuthStore from '../.././stores/AuthStore';

export default class AuthHandler extends Component {

  // Gets the location from the route component
  static contextTypes = {
    currentUser: PropTypes.object,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = this._getInitialState();
  };

  componentWillMount() {
    // Redirects the user to the dashboard if they're already logged in.
    if (this.context.currentUser) this.context.history.replaceState(null, '/dashboard');
  }

  componentDidMount () {
    this._unsubscribe = AuthStore.listen(this._updateState);
  }

  componentWillUnmount () {
    this._unsubscribe(); 
  }

  render () {
    const path = this.context.location.pathname;

    // Returns the registration form if the route path is '/join', otherwise
    // returns the login form by default.
    if (path === '/join') {
      return (
        <RegistrationForm
          errors={this.state.errors}
          user={this.state.user}
          registrationError={this.state.registrationError}
        />
      );
    }

    return (
      <LoginForm 
        loginError={this.state.loginError}
        errors={this.state.errors}
        user={this.state.user}
      />
    );

  }

  _getInitialState = () => {
    let state = AuthStore.getState();
    return {
      user: state.user,
      errors: state.errors,
      loginError: state.loginError,
      registrationError: state.registrationError
    };
  }

  _updateState = (state) => {
    this.setState({
      user: state.user,
      errors: state.errors, 
      loginError: state.loginError,
      registrationError: state.registrationError
    });
  }

}