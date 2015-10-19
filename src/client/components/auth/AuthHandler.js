import React, {PropTypes} from 'react';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

import AuthStore from '../.././stores/AuthStore';

export default class AuthHandler extends React.Component {

  // Gets the location from the route component
  static contextTypes = {
    location: PropTypes.object
  }

  constructor (props) {
    super(props);
    this.state = this._getInitialState();
  }

  componentDidMount () {
    this._unsubscribe = AuthStore.listen(this._updateState);

    // redirects the user away from login/join pages if the user session already exists
    if (localStorage.getItem('jwt')) this.context.router.transitionTo('/dashboard');
  }

  componentWillUnmount () {
    this._unsubscribe(); 
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
}